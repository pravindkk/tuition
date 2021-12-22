import { Storage } from "aws-amplify"
import { useEffect, useState } from "react"

const Video = (props) => {
    const [videoLink, setVideoLink] = useState('')

    const pullLink = async() => {
        const videoLink = await Storage.get(props.videoId)
        setVideoLink(videoLink);
    }

    useEffect(() => {
        pullLink()
    })

    return(
        <video src={videoLink} controls playsInline/>
    )
}

export default Video