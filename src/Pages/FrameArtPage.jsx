import React, { useEffect } from 'react'
import Frame from '../Components/Frame'
import Gallery from '../Components/Gallery'
import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Controller, useForm } from "react-hook-form"
import { useTheme } from '@mui/material'
import { useIdle } from "react-use"

const IDLE_TIME = 30;
const SLIDE_TIME = 4;

const FrameArtPage = ({ course, children }) => {

    const theme = useTheme()
    const isIdle = useIdle(IDLE_TIME * 1000, true);

    // const [form, setForm] = useState({});
    const { watch, setValue, control } = useForm({
        defaultValues: {
            type: "art",
            holeIndex: "0",
            color: "brown"
        }
    })

    const advanceSlide = () => {
        if (!isIdle) return;
        setValue("holeIndex", String(Math.floor(Math.random() * course.assets.holes.length)))
    }

    useEffect(() => {
        const changeSlideInterval = setInterval(advanceSlide, SLIDE_TIME * 1000)

        return () => {
            clearInterval(changeSlideInterval)
        }
    })

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={7}>
                <Stack style={{ marginTop: "2vh" }}>
                    <Typography variant="h4" sx={{ textAlign: "center", color: theme.palette.primary.main }}>Select your favorite hole!</Typography>
                    <Frame course={course} hole={course.assets.holes[+watch("holeIndex")]} form={watch()} />
                    <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.primary.main }}>Available Sizes: Small - 24"x14" (20"x10" print) | Medium - 28"x16" (24"x12")|  Large - 34"x19" (30"x15") | Extra Large - 44"x24" (40"x20")</Typography>
                    <Grid marginTop={2} container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="color"
                                control={control}
                                render={({ field }) => <FormControl fullWidth>
                                    <InputLabel id="color-label">Frame Size</InputLabel>
                                    <Select size="small" {...field} label="Frame Color" labelId="color-label">
                                        <MenuItem value="brown">{course.slug === "new-jersey-national" ? "Brown Mahogany" : "Small / Medium"}</MenuItem>
                                        <MenuItem value="red">{course.slug === "new-jersey-national" ? "Red Mahogany" : "Large / Extra Large"}</MenuItem>
                                    </Select>
                                </FormControl>
                                }
                            />
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    {children}
                </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
                <Typography sx={{ fontWeight: "bold" }} variant="h4" my={2} align="center" color={theme.palette.primary.main}>{course.courseName}</Typography>
                <Gallery course={course} form={watch()} setValue={setValue} />
            </Grid>
        </Grid>
    )
}

export default FrameArtPage
