import React from 'react'
import { useForm } from "react-hook-form"

const Form = ({course, setForm}) => {
    const { register, watch } = useForm()
    
    const handleUpdate = (form) => {
        if(form.type === "hio"){
            delete form.event
        }
        if(form.type === "event"){
            delete form.hio
        }

        setForm(form)
    }  

    return (
        <form id="form" onChange={() => handleUpdate(watch())}>

            {/* Always Visible */}
            <select {...register("type")}>
                <option value="None Chosen">Select an Award/Photo Art Type</option>
                <option value="hio">Hole In One Award</option>
                <option value="event">Event Award</option>
                <option value="art">Framed Photo Art</option>
            </select>
            <select {...register("size")}>
                <option value="None Chosen">Choose a size</option>
                <option value="20x10">20x10</option>
                <option value="24x12">24x12</option>
                <option value="30x15">30x15</option>
                <option value="30x15">40x20</option>
            </select>
            <select {...register("holeIndex")}>
                <option>Select a photo</option>
                {course.assets.holes.map((hole, index) => 
                    <option value={index} key={index}>{hole.description}</option>
                )}
            </select>

            {/* Hole in One */}
            { watch("type") === "hio" && <>
                <input {...register("hio.playerName")} />
                <input {...register("hio.clubUsed")} />
                <input type="date" {...register("hio.date")} />
                <input type="number" {...register("hio.distance")} />
                <input {...register("hio.witnesses")} />
            </> }

            {/* Event Award */}
            { watch("type") === "event" && <>
                <input {...register("event.playerNames")} />
                <input {...register("event.awardName")} />
            </> }
        </form>
    )
}

export default Form
