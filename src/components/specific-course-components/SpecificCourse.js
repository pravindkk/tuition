import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import CourseNavBar from "./CourseNavbar";

import { Video } from '../../models'

import ShowVideo from "./ShowVideo";

const SpecificCourse = () => {
    const params = useParams();

    const [videos, setVideo] = useState([])

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
        <div className="specific-course-list">
            <CourseNavBar id={params.id}/>
            <ShowVideo names={videos} />
        </div>
    )
}

export default SpecificCourse