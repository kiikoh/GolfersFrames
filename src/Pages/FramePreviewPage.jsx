import React, { useState, useEffect } from 'react'
import courses from "../master.json"
import Frame from '../Components/Frame'
import Form from '../Components/Form'
import Gallery from '../Components/Gallery'

const FramePreviewPage = () => {

    const [course, setCourse] = useState(courses[0])
    const [hole, setHole] = useState(course.assets.holes[0])
    const [form, setForm] = useState({});

    useEffect(() => {
        setHole(course.assets.holes[+form.holeIndex]) // keep the hole obj updated with the index of it
    }, [form.holeIndex, course.assets.holes])

    return (
        <div>
            <select onChange={(e) => setCourse(courses[e.target.value])}>
                {courses.map((course, key) => 
                    <option value={key} key={key}>{course.courseName}</option>
                )}
            </select>
            <div id="mainContainer">
                <div id="frameForm">
                    <Frame course={course} hole={hole} form={form} />
                    <Form course={course} setForm={setForm} />
                </div>
                <Gallery course={course}/>
            </div>
        </div>
    
    )
}

export default FramePreviewPage
