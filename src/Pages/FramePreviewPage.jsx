import React, { useState, useEffect } from 'react'
import courses from "../master.json"
import Frame from '../Components/Frame'
import Form from '../Components/Form'
import Gallery from '../Components/Gallery'
import { Grid, Stack } from '@mui/material'

const FramePreviewPage = () => {

    const [course, setCourse] = useState(courses[0])
    const [hole, setHole] = useState(course.assets.holes[0])
    const [form, setForm] = useState({});

    useEffect(() => {
        setHole(course.assets.holes[+form.holeIndex]) // keep the hole obj updated with the index of it
    }, [form.holeIndex, course.assets.holes])

    return (
        <Grid container spacing={1}>
            <Grid item xs={10} md={7} lg={6}>
                <Stack>
                    <Frame course={course} hole={hole} form={form} />
                    <Form course={course} setForm={setForm} />
                </Stack>
            </Grid>
            <Grid item xs={2} md={5} lg={6}>
                <Gallery course={course}/>
            </Grid>
        </Grid>
    )
}

export default FramePreviewPage
