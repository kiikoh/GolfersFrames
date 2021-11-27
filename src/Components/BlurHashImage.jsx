import React, {useState} from 'react'
import { Blurhash } from 'react-blurhash';
import ProgressiveImage from 'react-progressive-graceful-image';

const BlurHashImage = ({src: imgSrc, alt: imgAlt, hash}) => {

    const [loaded, setLoaded] = useState(false);

    return (
        <ProgressiveImage src={imgSrc} delay={1000}>
            {(src, loading) => {
                return loading ? <Blurhash hash={hash} height={9 * 10} width={20 * 10}/> : <img src={src} alt={imgAlt} height={9 * 10}/>;
            }}
        </ProgressiveImage>
    )
}

export default BlurHashImage
