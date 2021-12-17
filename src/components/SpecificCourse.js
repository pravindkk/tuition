import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";

import { Video } from '../models'

import VideoForm from './VideoForm'
import VideoView from './Video'

const SpecificCourse = () => {
    const params = useParams();
    // console.log(params);

    // const [courses, setCourses] = useState([])
    const [videos, setVideo] = useState([])
    // const [videoFile, setVideoFile] = useState('')

    useEffect(() => {
        const pullData = async () => {
          try {
            // console.log('hi');
            // const models = await DataStore.query(Course);
            // // console.log(models);
            // setCourses(models);
            const videoQuery = await DataStore.query(Video)
            console.log(videoQuery);
            setVideo(videoQuery)
            // console.log(videos);
            // const videoFileLink = await Storage.get(videoQuery[0].id)
            // setVideoFile(videoFileLink)
          } catch(err) {
            console.log(err);
          }
          
        }
        pullData()
      }, []);

    // const addVideo = () => {
    //     window.location.pathname = "/add-video"
    // }

    
    // console.log(params);
    return(
        <div>
            <h2>{params.id}</h2>
            {/* <button onClick={addVideo}>Add Video</button> */}
            <VideoForm courseId={params.id} />
            {videos.map(video => {
                if (video.courseID === params.id) {
                    return(
                        <div key={video.id}>
                            <h3>{video.title}</h3>
                            <VideoView videoId={video.id} />
                        </div>
                    )
                } else {
                    return(
                        <div key={video.id}>
                        </div>
                    )
                }
                
            }
            // (
            //     <div key={video.id}>
            //         <VideoView videoId={video.id} />

            //     </div>
                
            // )
            )}
            {/* <video src={videoFile} controls /> */}
        </div>
    )
}

export default SpecificCourse