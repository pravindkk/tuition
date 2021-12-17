import { DataStore } from '@aws-amplify/datastore';
import { Storage } from 'aws-amplify';
import { Course, Video } from './models';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { useEffect, useState } from 'react';


import VideoForm from './components/VideoForm'

function App() {
  const [courses, setCourses] = useState([])
  const [video, setVideo] = useState([])
  const [videoFile, setVideoFile] = useState('')

  useEffect(() => {
    const pullData = async () => {
      try {
        console.log('hi');
        const models = await DataStore.query(Course);
        // console.log(models);
        setCourses(models);
        const videoQuery = await DataStore.query(Video)
        console.log(videoQuery);
        setVideo(videoQuery[0])
        const videoFileLink = await Storage.get(videoQuery[0].id)
        setVideoFile(videoFileLink)
      } catch(err) {
        console.log(err);
      }
      
    }
    pullData()
  }, []);

  const addCourse = async () => {
    try {
      const course = await DataStore.save(
          new Course({
          "title": window.prompt(),
          "description": window.prompt(),
          "videos": []
        })
      );
      console.log(course);
    } catch(err) {
      console.log(err);
    }
    
  }

  const deleteCourse = async(id) => {
    // console.log(id);
    const modelToDelete = await DataStore.query(Course, id);
    // console.log(modelToDelete);
    DataStore.delete(modelToDelete);
    window.location.reload()
  }

  return (
    <div className="App">
      <h1>Video Courses</h1>
      {courses.map(course => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <VideoForm courseId={course.id}/>
          <button onClick={() => deleteCourse(course.id)}>Delete Course</button>
        </div>
      ))}
      <video src={videoFile} controls />
      <button onClick={addCourse}>Add Course</button>
    </div>
  );
}

export default withAuthenticator(App);
