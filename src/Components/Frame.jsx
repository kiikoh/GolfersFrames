import { style } from '@mui/system'
import moment from 'moment'
import React from 'react'
import styles from "./Frame.module.css"

const Frame = ({course, form, hole}) => {

    const currHoleSrc = () => `${process.env.PUBLIC_URL}/assets/${course.folder}/${hole?.url || "hole1.jpg"}`
    const currMat = () => `${process.env.PUBLIC_URL}/assets/${form.type === "art" ? "1line.png" : "3line.png"}` // move into src
    const currLogo = () => `${process.env.PUBLIC_URL}/assets/${course.folder}/${course.assets.logo}`

    const buildCaption = () => {
        let arr = new Array(9).fill("\u200B");

        /*  Caption Layout
                0 1 2
                3 4 5
                6 7 8       */

        arr[1] = course.courseName
        let holeNum = null;
        holeNum = hole.description.split(" ").find((str) => !isNaN(str) && !isNaN(parseFloat(str)))

        switch(form.type) {
            case "hio":
                // Escape the rest if not on a hole
                if(!holeNum) return arr;
                
                arr[4] = "Hole in one - " + form.hio.playerName
                arr[7] = form.hio.date.format("MMMM D, YYYY")

                let witnesses = form.hio.witnesses.filter(wit => wit !== "")
                if(witnesses.length > 0) {
                    arr[0] = "Witnessed By:"
                    arr[3] = witnesses.slice(0,2).join(", ")
                    arr[6] = witnesses[2] || ""


                    arr[2] = "Hole #" + holeNum
                } else {
                    arr[3] = "Hole #" + holeNum
                }

                 
                arr[5] = `Par ${hole.par} - ${form.hio.distance} yards`
                arr[8] = form.hio.clubUsed; 

                break;
            case "event": 
                arr[4] = form.event.playerNames;
                arr[7] = form.event.awardName;

                if(holeNum) {
                    arr[0] = "Hole #" + holeNum; 
                    arr[2] = `Par ${hole.par} - ${hole.yards} yards`
                } else {
                    arr[0] = ""; 
                    arr[2] = "";
                }
                break;
            case "art": 
                arr = arr.slice(0, 3)
                if(holeNum) {
                    arr[0] = "Hole #" + holeNum; 
                    arr[2] = `Par ${hole.par} - ${hole.yards} yards`
                } else {
                    arr[0] = ""; 
                    arr[2] = "";
                }
                break;
            default: 
                console.error("This shouldn't happen")
                break;
        }

        return arr;
    }

    return (
        <div id={styles.frameContainer}>
            <img id={styles.mainPhoto} src={currHoleSrc()} alt={hole?.description}/>
            <img src={currMat()} alt="mat"/>
            <img src={currLogo()} alt="logo"/>
            <img src={process.env.PUBLIC_URL + '/assets/frame.png'} alt="frame"/>
            <div id={styles.caption}>
                {buildCaption().map((text, index) => 
                    <span key={index}>{text}</span>
                )}
            </div>
        </div>
    )
}

export default Frame
