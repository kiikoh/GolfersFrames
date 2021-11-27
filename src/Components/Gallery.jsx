import React from 'react'
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"

const Gallery = ({course}) => {
    return (
        <Grid container spacing={1}>
            {course.assets.holes.map((hole, index) => {
                return <Grid key={index} item xs={12} md={6} lg={4}> 
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={`${process.env.PUBLIC_URL}/assets/${course.folder}/${hole.url}`}
                                    alt={hole.description}                                
                                />
                                <Typography gutterBottom variant="p" component="div" sx={{textAlign: "center"}}>
                                    {hole.description}                                    
                                </Typography>
                            </Card>
                        </Grid>
            })}
        </Grid>
    )
}

export default Gallery
