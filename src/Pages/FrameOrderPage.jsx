import React, { useState } from 'react'
import courses from "../master.json"
import Frame from '../Components/Frame'
import Form from '../Components/Form'
import Gallery from '../Components/Gallery'
import { Grid, Stack, Typography } from '@mui/material'
import { useForm } from "react-hook-form"
import moment from 'moment'
import { useTheme } from '@mui/material'

const FrameOrderPage = ({course}) => {

    const theme = useTheme()

    // const [form, setForm] = useState({});
    const { watch, control, setValue } = useForm({
        defaultValues: {
            type: "art",
            color: "red",
            size: "20x10",
            holeIndex: "0",
            hio: {
                date: moment(),
                playerName: "",
                clubUsed: "",
                witnesses: ["", "", ""],
                distance: ""
            },
            event: {
                playerNames: "",
                awardName: ""
            },
            email: "",
            notes: ""
        }
    })

    return (
        <Grid container spacing={1}>
            <Grid item xs={10} md={7}>
                <Stack>
                    <Frame course={course} hole={course.assets.holes[+watch("holeIndex")]} form={watch()} />
                    <Form course={course} control={control} watch={watch}/>
                </Stack>
            </Grid>
            <Grid item xs={2} md={5}>
                <Typography sx={{fontWeight: "bold"}} variant="h4" my={2} align="center" color={theme.palette.primary.main}>{course.courseName}</Typography>
                <Gallery course={course} form={watch()} setValue={setValue}/>
            </Grid>
        </Grid>
    )
}

export default FrameOrderPage
