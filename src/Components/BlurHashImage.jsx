import React from 'react'
import { Blurhash } from 'react-blurhash';
import ProgressiveImage from 'react-progressive-graceful-image';

const BlurHashImage = ({src: imgSrc, alt: imgAlt, hash}) => {

    return (
        <ProgressiveImage src={imgSrc} delay={250}>
            {(src, loading) => {
                return loading ? <Blurhash hash={hash} height={100} width="100%"/> : <img src={src} alt={imgAlt} width="100%"/>;
            }}
        </ProgressiveImage>
    )
}

export default BlurHashImage
