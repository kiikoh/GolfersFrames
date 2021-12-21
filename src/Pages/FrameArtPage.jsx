import React from 'react'
import Frame from '../Components/Frame'
import Gallery from '../Components/Gallery'
import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Controller, useForm } from "react-hook-form"
import { useTheme } from '@mui/material'

const FrameArtPage = ({course}) => {

    const theme = useTheme()

    // const [form, setForm] = useState({});
    const { watch, setValue, control } = useForm({
        defaultValues: {
            type: "art",
            holeIndex: "0",
            color: "brown"
        }
    })

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={7}>
                <Stack style={{marginTop: "6vh"}}>
                    <Typography variant="h4" sx={{textAlign: "center", color: theme.palette.primary.main}}>Select a photo and order at your pro shop!</Typography>
                    <Frame course={course} hole={course.assets.holes[+watch("holeIndex")]} form={watch()} />
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="color"
                                control={control}
                                render={({field}) => <FormControl fullWidth>
                                        <InputLabel id="color-label">Frame Color</InputLabel>
                                        <Select size="small" {...field} label="Frame Color" labelId="color-label">
                                            <MenuItem value="brown">Brown Mahogany</MenuItem>
                                            <MenuItem value="red">Red Mahogany</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                            />  
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    
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
