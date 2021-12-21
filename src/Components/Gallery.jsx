import React from 'react'
import { Card, CardMedia, Grid, Typography } from "@mui/material"
import { useTheme } from '@mui/styles';
import {} from "react-blurhash"
import BlurHashImage from './BlurHashImage';

const Gallery = ({course, setValue, form}) => {

    const theme = useTheme();

    return (
        <Grid container spacing={1} style={{maxHeight: '85vh', overflow: 'auto', scrollbarWidth: "none"}}>
            {course.assets.holes.map((hole, index) => {
                return <Grid key={index} item xs={12} md={6} lg={4}> 
                            <Card 
                                onClick={() => setValue("holeIndex", index)} 
                                style={{
                                    backgroundColor: index === form.holeIndex ? theme.palette.primary.main : theme.palette.secondary.main,
                                    border: "solid #aaa 1px"
                                }}>
                                <CardMedia>
                                    <BlurHashImage 
                                        src={`${process.env.PUBLIC_URL}/assets/${course.folder}/${hole.url}`}
                                        alt={hole.description} 
                                        hash={hole.blurhash}
                                    />
                                </CardMedia>
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
