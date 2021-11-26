import React from 'react'

const Gallery = ({course}) => {
    return (
        <div id="gallery">
            {course.assets.holes.map((hole, index) => {
                return <div>
                    <img src={`${process.env.PUBLIC_URL}/assets/${course.folder}/${hole.url}`} key={index} alt={hole.description} />
                    <span>{hole.description}</span>
                </div>
            })}
        </div>
    )
}

export default Gallery
