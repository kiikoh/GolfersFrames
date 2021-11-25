import React, {useState} from 'react'
import courses from "../master.json"
import Frame from '../Components/Frame'

const FramePreviewPage = () => {

    const [course, setCourse] = useState(courses[0])

    return (
        <div>
            <select onChange={(e) => setCourse(courses[e.target.value])}>
                {courses.map((course, key) => {
                    return <option value={key} key={key}>{course.courseName}</option>
                })}
            </select>
            <Frame course={course}/>
        </div>
    )
}

export default FramePreviewPage
