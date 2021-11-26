import React from 'react'

const Frame = ({course, form, hole}) => {

    const currHoleSrc = () => `${process.env.PUBLIC_URL}/assets/${course.folder}/${hole?.url || "hole1.jpg"}`
    const currMat = () => `${process.env.PUBLIC_URL}/assets/${form.type === "art" ? "1line.png" : "3line.png"}`
    const currLogo = () => `${process.env.PUBLIC_URL}/assets/${course.folder}/${course.assets.logo}`

    return (
        <div id="frameContainer">
            <img id="mainPhoto" src={currHoleSrc()} alt={hole?.description}/>
            <img src={currMat()} alt="mat"/>
            <img src={currLogo()} alt="logo"/>
            <img src={process.env.PUBLIC_URL + '/assets/frame.png'} alt="frame"/>
            <div id="caption">
                <span>1</span>
                <span>{course.courseName}</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
            </div>
        </div>
    )
}

export default Frame
