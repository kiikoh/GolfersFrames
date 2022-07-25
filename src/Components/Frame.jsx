import React from "react";
import styles from "./Frame.module.css";
import frameRed from "../assets/frame-red.webp";
import frameBrown from "../assets/frame-brown.webp";
import oneline from "../assets/1line.png";
import threeline from "../assets/3line.png";
import withBall from "../assets/3linecut.png";
import ball from "../assets/golfball.png";

const Frame = ({ course, form, hole }) => {
  const currFrameSrc = () => (form.color === "red" ? frameRed : frameBrown);
  const currHoleSrc = () =>
    `${process.env.PUBLIC_URL}/assets/${course.folder}/${
      hole?.url || "hole1.jpg"
    }`;
  const currMat = () => {
    if (form.type === "art") return oneline;
    if (form.type === "hiowb") return withBall;
    return threeline;
  }; // move into src
  const currLogo = () =>
    `${process.env.PUBLIC_URL}/assets/${course.folder}/${course.assets.logo}`;

  const buildCaption = () => {
    let arr = new Array(9).fill("\u200B");

    /*  Caption Layout
                0 1 2
                3 4 5
                6 7 8       */

    arr[1] = course.courseName;
    let holeNum = null;
    holeNum = hole.description
      .split(" ")
      .find((str) => !isNaN(str) && !isNaN(parseFloat(str)));
    if (hole.parValue == null && hole.yards == null) holeNum = null;

    switch (form.type) {
      case "hio":
      case "hiowb":
        // Escape the rest if not on a hole
        if (!holeNum) return arr;

        arr[4] = "Hole in one - " + form.hio.playerName;
        arr[7] = form.hio.date.format("MMMM D, YYYY");

        let witnesses = form.hio.witnesses.filter((wit) => wit !== "");
        if (witnesses.length > 0) {
          arr[0] = "Witnessed By:";
          arr[3] = witnesses.slice(0, 2).join(", ");
          arr[6] = witnesses[2] || "";

          arr[2] = "Hole #" + holeNum;
        } else {
          arr[3] = "Hole #" + holeNum;
        }

        arr[5] = `Par ${hole.par} - ${form.hio.distance} yards`;
        arr[8] = form.hio.clubUsed;

        break;
      case "event":
        arr[4] = form.event.playerNames;
        arr[7] = form.event.awardName;

        if (holeNum) {
          arr[0] = "Hole #" + holeNum;
          arr[2] = `Par ${hole.par} - ${hole.yards} yards`;
        } else {
          arr[0] = "";
          arr[2] = "";
        }
        break;
      case "art":
        arr = arr.slice(0, 6);
        if (holeNum) {
          arr[0] = "Hole #" + holeNum;
          arr[2] = `Par ${hole.par} - ${hole.yards} yards`;
        } else {
          arr[0] = "";
          arr[2] = "";
        }
        break;
      default:
        console.error("This shouldn't happen");
        break;
    }

    return arr;
  };

  return (
    <div id={styles.frameContainer}>
      <img id={styles.mainPhoto} src={currHoleSrc()} alt={hole?.description} />
      <img src={currMat()} alt="mat" />
      {form.type === "hiowb" && (
        <img id={styles.golfball} src={ball} alt="ball insert" />
      )}
      <img src={currLogo()} alt="logo" />
      <img src={currFrameSrc()} alt="frame" />
      <div
        id={styles.caption}
        className={form.type === "hiowb" && styles.withBall}
      >
        {buildCaption().map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </div>
    </div>
  );
};

export default Frame;
