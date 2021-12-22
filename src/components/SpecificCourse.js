import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Link } from "react-router-dom";

import { Video } from '../models'

import VideoForm from './VideoForm'
import VideoView from './Video'

import ShowVideo from "./ShowVideo";

const SpecificCourse = () => {
    const params = useParams();
    // console.log(params);

    // const [courses, setCourses] = useState([])
    const [videos, setVideo] = useState([])
    // const [videoFile, setVideoFile] = useState('')

    useEffect(() => {
        const pullData = async () => {
          try {
            const videoQuery = await DataStore.query(Video)
            videoQuery.map(video => {
                if (video.courseID === params.id) {
                    videos.push(video)
                }
            })
            // console.log(videos);
          } catch(err) {
            console.log(err);
          }
          
        }
        pullData()
    }, []);


    return(
        <div>
            <h2>{params.id}</h2>
            <Link to={`/add-video/${params.id}`}>Add Video</Link>
            <ShowVideo names={videos} />
            
            
        </div>
    )
}

export default SpecificCourse