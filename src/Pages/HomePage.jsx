import { Card, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import BlurHashImage from '../Components/BlurHashImage'
import courses from "../master.json"
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <Grid container mt={3}>
            <Grid item xs={0} md={1}></Grid>
            <Grid item xs={12} md={10}>
                <Typography variant="h2" align="center">Our Courses</Typography>
                <Grid container spacing={2} mt={2}>
                    {courses.map((course, index) => 
                        <Grid key={index} item xs={6} md={4} lg={3}>
                            <Card
                                onClick={() => navigate(course.slug)}
                                style={{border: "solid #aaa 1px"}}>
                                <CardMedia>
                                    <BlurHashImage 
                                        src={`${process.env.PUBLIC_URL}/assets/${course.folder}/${course.assets.holes[course.thumbnailIndex || 0].url}`}
                                        alt={course.assets.holes[0].description} 
                                        hash={course.assets.holes[0].blurhash}
                                    />
                                </CardMedia>
                                <Typography gutterBottom variant="p" component="div" sx={{textAlign: "center"}}>
                                    {course.courseName}                                    
                                </Typography>
                            </Card>
                        </Grid>
                    )}
                    
                </Grid>
            </Grid>
            <Grid item xs={0} md={1}></Grid>
        </Grid>
    )
}

export default HomePage
