import React, { useState } from 'react'
import courses from "../master.json"
import Frame from '../Components/Frame'
import Form from '../Components/Form'
import Gallery from '../Components/Gallery'
import { Grid, Stack, Typography } from '@mui/material'
import { useForm } from "react-hook-form"
import moment from 'moment'
import { useTheme } from '@mui/material'

const FrameArtPage = ({course}) => {

    const theme = useTheme()

    // const [form, setForm] = useState({});
    const { watch, setValue } = useForm({
        defaultValues: {
            type: "art",
            holeIndex: "0",
        }
    })

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={7}>
                <Stack style={{marginTop: "6vh"}}>
                    <Typography variant="h4" sx={{textAlign: "center", color: theme.palette.primary.main}}>Select a photo and order at your pro shop!</Typography>
                    <Frame course={course} hole={course.assets.holes[+watch("holeIndex")]} form={watch()} />
                </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
                <Typography sx={{fontWeight: "bold"}} variant="h4" my={2} align="center" color={theme.palette.primary.main}>{course.courseName}</Typography>
                <Gallery course={course} form={watch()} setValue={setValue}/>
            </Grid>
        </Grid>
    )
}

export default FrameArtPage
