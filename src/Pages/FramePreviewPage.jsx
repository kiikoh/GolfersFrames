import React, { useState } from 'react'
import courses from "../master.json"
import Frame from '../Components/Frame'
import Form from '../Components/Form'
import Gallery from '../Components/Gallery'
import { Grid, Stack } from '@mui/material'
import { useForm } from "react-hook-form"
import moment from 'moment'

const FramePreviewPage = () => {

    const [course, setCourse] = useState(courses[0])
    // const [form, setForm] = useState({});
    const { watch, control, setValue } = useForm({
        defaultValues: {
            type: "art",
            size: "20x10",
            holeIndex: "0",
            hio: {
                date: moment(),
                playerName: "",
                clubUsed: "",
                witnesses: ["", "", ""],
                distance: 0
            },
            event: {
                playerNames: "",
                awardName: ""
            },
            email: ""
        }
    })

    return (
        <Grid container spacing={1}>
            <Grid item xs={10} md={8}>
                <Stack>
                    <Frame course={course} hole={course.assets.holes[+watch("holeIndex")]} form={watch()} />
                    <Form course={course} control={control} watch={watch}/>
                </Stack>
            </Grid>
            <Grid item xs={2} md={4}>
                <Gallery course={course} form={watch()} setValue={setValue}/>
            </Grid>
        </Grid>
    )
}

export default FramePreviewPage
