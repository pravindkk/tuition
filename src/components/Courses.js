import { useEffect, useState } from "react"
import { Course } from '../models';
import { DataStore } from '@aws-amplify/datastore';
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";


const Courses = () => {
    const [courses, setCourses] = useState([])
    const [admin, setAdmin] = useState(Boolean)
    
    useEffect(() => {
        const pullCourses = async() => {
            try {
                const models = await DataStore.query(Course)
                // console.log(models);
                setCourses(models)
            } catch(err) {
                console.log(err);
            }
        }
        const checkUser = async() => {
            const user = await Auth.currentAuthenticatedUser();
            const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
            if (groups === undefined) {
                return;
            }
            if (groups.includes('admin') === true) {
                document.getElementById('add-course-btn').hidden = false;
                document.getElementsByClassName('delete-course-btn').hidden = false;
            }
            // console.log(groups);
        }
        pullCourses()
        checkUser()
    },[])

    const addCourse = async() => {
        window.location.pathname = '/add-course'
    }

    const deleteCourse = async(id) => {
        const modelToDelete = await DataStore.query(Course, id);
        const del = await DataStore.delete(modelToDelete);
        window.location.reload()
    }
    
    return(
        <div className="total-courses">
            <h1>Video Courses</h1>
            <div className="specific-course" style={{
                paddingTop: 0
            }}>
                <h3 className="title">Title</h3>
                <h3 className="desc">Description</h3>
                {/* <h3 className="delete-course-btn" hidden>Delete Course</h3> */}
            </div>
            
            {courses.map(course => (
                <div className="specific-course" key={course.id} style={{
                    paddingTop: 0
                }}>
                    {/* <h2>{course.title}</h2> */}
                    <Link className="title" to={`/courses/${course.title}`}>{course.title}</Link>
                    <p className="desc">{course.description}</p>
                    <button className="delete-course-btn" onClick={() => deleteCourse(course.id)}>Delete Course</button>
                </div>
            ))}
            
            <button id="add-course-btn" onClick={addCourse} hidden>Add Course</button>
            
        </div>
    )
    
}

export default Courses