import React, {useState, useEffect} from 'react'
import Form from './Form'

const Frame = ({course}) => {

    const [form, setForm] = useState({});
    const [hole, setHole] = useState(null);
    
    useEffect(() => {
        setHole(form) //TODO: Move state up
    }, [form])

    console.log(form)

    return (
        <div>
            <p>{course.courseName}</p>
            <Form course={course} setForm={setForm} />
        </div>
    )
}

export default Frame
