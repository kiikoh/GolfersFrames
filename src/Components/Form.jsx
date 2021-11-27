import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller} from "react-hook-form"
import DatePicker from '@mui/lab/DatePicker';

const Form = ({course, setForm, control, watch}) => {

    const handleSubmit = () => {

    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <Controller
                    name="type"
                    control={control}
                    render={({field}) => <FormControl fullWidth margin="dense">
                            <InputLabel id="type-label">Frame Format</InputLabel>
                            <Select {...field} label="Frame Format" labelId="type-label">
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
                            <TextField label="Player Name" variant="outlined" {...field} fullWidth margin="dense" required/>
                        }
                    />
                    <Controller 
                        name="hio.clubUsed"
                        control={control}
                        render={({field}) => 
                            <TextField label="Club Used" variant="outlined" {...field} fullWidth margin="dense" required/>
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
                                renderInput={(params) => <TextField {...params} margin="dense" required/>}
                            />
                        }
                    />
                    <Controller 
                        name="hio.distance"
                        control={control}
                        render={({field}) => 
                            <TextField 
                                label="Distance" 
                                variant="outlined" 
                                type="number" {...field} 
                                fullWidth 
                                margin="dense" 
                                required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">yards</InputAdornment>,
                                }}/>
                        }
                    />
                    <Controller 
                        name="hio.witnesses.0"
                        control={control}
                        render={({field}) => 
                            <TextField label="Witness 1" variant="outlined" {...field} fullWidth margin="dense" placeholder="John Smith"/>
                        }
                    />
                    <Controller 
                        name="hio.witnesses.1"
                        control={control}
                        render={({field}) => 
                            <TextField label="Witness 2" variant="outlined" {...field} fullWidth margin="dense" placeholder="Jane Doe"/>
                        }
                    />
                    <Controller 
                        name="hio.witnesses.2"
                        control={control}
                        render={({field}) => 
                            <TextField label="Witness 3" variant="outlined" {...field} fullWidth margin="dense" placeholder="Billy Walters"/>
                        }
                    />
                </>}

                {watch("type") === "event" && <>
                    <Controller 
                        name="event.playerNames"
                        control={control}
                        render={({field}) => 
                            <TextField label="Player Name(s)" variant="outlined" {...field} fullWidth margin="dense" required/>
                        }
                    />
                    <Controller 
                        name="event.awardName"
                        control={control}
                        render={({field}) => 
                            <TextField label="Award Name" variant="outlined" {...field} fullWidth margin="dense" required/>
                        }
                    />
                </>}
            </Grid>
            <Grid item xs={4}>
                <Controller 
                    name="email"
                    control={control}
                    render={({field}) => 
                        <TextField label="Email" variant="outlined" {...field} fullWidth margin="dense"/>
                    }
                />
                <Button onClick={handleSubmit} variant="contained" fullWidth>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default Form
