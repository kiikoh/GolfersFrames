import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from "react-hook-form"
import DatePicker from '@mui/lab/DatePicker';

const Form = ({course, setForm}) => {
    const { register, watch, control } = useForm({
        defaultValues: {
            type: "none",
            size: "20x10",
            holeIndex: "0"
        }
    })
    
    const handleUpdate = (form) => {
        if(form.type === "hio"){
            delete form.event
        }
        if(form.type === "event"){
            delete form.hio
        }

        setForm(form)
    }  

    const handleSubmit = () => {

    }

    console.log(watch())

    return (
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <Controller
                    name="type"
                    control={control}
                    render={({field}) => <FormControl fullWidth margin="dense">
                            <InputLabel id="type-label">Frame Format</InputLabel>
                            <Select {...field} label="Frame Format" labelId="type-label">
                                <MenuItem value="none">None</MenuItem>
                                <MenuItem value="hio">Hole In One</MenuItem>
                                <MenuItem value="event">Event Award</MenuItem>
                                <MenuItem value="art">Framed Photo Art</MenuItem>
                            </Select>
                        </FormControl>
                    }
                />
                <Controller
                    name="size"
                    control={control}
                    render={({field}) => <FormControl fullWidth margin="dense">
                            <InputLabel id="size-label">Frame Size</InputLabel>
                            <Select {...field} label="Frame Size" labelId="size-label">
                                <MenuItem value="20x10">20x10</MenuItem>
                                <MenuItem value="24x12">24x12</MenuItem>
                                <MenuItem value="30x15">30x15</MenuItem>
                                <MenuItem value="30x15">40x20</MenuItem>
                            </Select>
                        </FormControl>
                    }
                />
                <Controller
                    name="holeIndex"
                    control={control}
                    render={({field}) => <FormControl fullWidth margin="dense">
                            <InputLabel id="holeIndex-label">Photo</InputLabel>
                            <Select {...field} label="Photo" labelId="holeIndex-label">
                                {course.assets.holes.map((hole, index) => 
                                    <MenuItem value={index} key={index}>{hole.description}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    }
                />
            </Grid>
            <Grid item xs={4}>
                {watch("type") === "hio" && <>
                    <Controller 
                        name="hio.playerName"
                        control={control}
                        render={({field}) => 
                            <TextField label="Player Name" variant="outlined" {...field} fullWidth margin="dense"/>
                        }
                    />
                    <Controller 
                        name="hio.clubUsed"
                        control={control}
                        render={({field}) => 
                            <TextField label="Club Used" variant="outlined" {...field} fullWidth margin="dense"/>
                        }
                    />
                    <Controller 
                        name="hio.date"
                        control={control}
                        render={({field}) => 
                            <DatePicker 
                                label="Date" 
                                variant="outlined" 
                                {...field} 
                                fullWidth
                                renderInput={(params) => <TextField {...params} margin="dense"/>}
                            />
                        }
                    />
                    <Controller 
                        name="hio.distance"
                        control={control}
                        render={({field}) => 
                            <TextField label="Distance" variant="outlined" type="number" {...field} fullWidth margin="dense"/>
                        }
                    />
                    <Controller 
                        name="hio.witnesses"
                        control={control}
                        render={({field}) => 
                            <TextField label="Witness(es)" variant="outlined" {...field} fullWidth margin="dense"/>
                        }
                    />
                </>}

                {watch("type") === "event" && <>
                    <Controller 
                        name="hio.playerNames"
                        control={control}
                        render={({field}) => 
                            <TextField label="Player Name(s)" variant="outlined" {...field} fullWidth margin="dense"/>
                        }
                    />
                    <Controller 
                        name="hio.awardName"
                        control={control}
                        render={({field}) => 
                            <TextField label="Award Name" variant="outlined" {...field} fullWidth margin="dense"/>
                        }
                    />
                </>}
            </Grid>
            <Grid item xs={4}>
                <Controller 
                    name="hio.playerNames"
                    control={control}
                    render={({field}) => 
                        <TextField label="Player Name(s)" variant="outlined" {...field} fullWidth margin="dense"/>
                    }
                />
                <Button onClick={handleSubmit} variant="contained" fullWidth>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default Form
