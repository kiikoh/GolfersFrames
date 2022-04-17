import React, {useMemo, useState} from 'react'
import { useLocation } from 'react-router-dom';
import FrameArtPage from './FrameArtPage';
import courses from "../master.json"
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import BlurHashImage from '../Components/BlurHashImage';
import { useTheme } from '@mui/styles';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const MultiArtPage = () => {
    let query = useQuery();

    const subset = query.getAll("course").map(id => courses[id]);
    const [courseIndex, setCourseIndex] = useState(0);

    console.log(subset[courseIndex])
    return <>
        <FrameArtPage course={subset[courseIndex]}>
            <Grid container spacing={2} padding={3}>
                        {subset.map((course, index) => 
                            <Grid key={index} item xs={4}>
                                <Card
                                    onClick={() => setCourseIndex(index)}
                                    style={{border: "solid #aaa 1px", backgroundColor: "#1269af", color: "white"}}>
                                    <CardMedia>
                                        <BlurHashImage 
                                            src={`${process.env.PUBLIC_URL}/assets/${course.folder}/${course.assets.holes[course.thumbnailIndex || 0].url}`}
                                            alt={course.assets.holes[0].description} 
                                            hash={course.assets.holes[0].blurhash}
                                        />
                                    </CardMedia>
                                    <Typography gutterBottom variant="h5" component="div" sx={{textAlign: "center"}}>
                                        {course.courseName.split(" - ")[1]}                                    
                                    </Typography>
                                </Card>
                            </Grid>
                        )}
            </Grid>
        </FrameArtPage>
        

    </>
}

export default MultiArtPage;