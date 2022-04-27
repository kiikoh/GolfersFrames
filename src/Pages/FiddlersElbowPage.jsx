import React, { useState } from "react";
import FrameArtPage from "./FrameArtPage";
import courses from "../master.json";
import { Card, CardMedia, Grid, Typography } from "@mui/material";
import BlurHashImage from "../Components/BlurHashImage";

const MultiArtPage = () => {
  const subset = [2, 3, 4].map((id) => courses[id]);
  const [courseIndex, setCourseIndex] = useState(0);

  return (
    <>
      <FrameArtPage course={subset[courseIndex]}>
        <Grid container spacing={2} padding={3}>
          {subset.map((course, index) => (
            <Grid key={index} item xs={4}>
              <Card
                onClick={() => setCourseIndex(index)}
                style={{
                  border: "solid #aaa 1px",
                  backgroundColor: index !== courseIndex ? "#ddd" : "#1269af",
                  color: index !== courseIndex ? "black" : "white",
                }}
              >
                <CardMedia>
                  <BlurHashImage
                    src={`${process.env.PUBLIC_URL}/assets/${course.folder}/${
                      course.assets.holes[course.thumbnailIndex || 0].url
                    }`}
                    alt={course.assets.holes[0].description}
                    hash={course.assets.holes[0].blurhash}
                  />
                </CardMedia>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  {course.courseName.split(" - ")[1]}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </FrameArtPage>
    </>
  );
};

export default MultiArtPage;
