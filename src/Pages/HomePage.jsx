import { Card, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import BlurHashImage from '../Components/BlurHashImage'
import courses from "../master.json"
import { useNavigate } from "react-router-dom";
import sampleFrame from "../assets/sampleframe.png"
import { useTheme } from '@mui/material'

const HomePage = () => {

    const navigate = useNavigate();
    const theme = useTheme()

    return (
        <Grid container mt={3}>
            
            <Grid item xs={0} md={1}></Grid>
            <Grid item xs={12} md={10}>
                <Grid container mb={3} spacing={2} alignItems="center" direction="row-reverse">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" sx={{textAlign: "center", fontWeight: "bold"}} color={theme.palette.primary.main}>Customizable High Quality Framed Photos</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={sampleFrame} alt="Example Frame" style={{width: "100%"}}/>
                    </Grid>
                </Grid>
                <Typography variant="h2" align="center" color={theme.palette.primary.main}>Our Courses</Typography>
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
