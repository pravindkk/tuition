import { DataStore } from "@aws-amplify/datastore"
import { Course } from '../../models'
import { useState, useEffect } from "react"
import { Auth } from "aws-amplify"

const AddCourse = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const checkUser = async() => {
            const user = await Auth.currentAuthenticatedUser();
            const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
            if (groups === undefined) {
                window.history.go(-1);
            }
        }
        checkUser()
    },[])

    const addCourse = async() => {
        try {
            const course = await DataStore.save(
                new Course({
                    title,
                    description,
                    videos:[]
                })
            )
            console.log(course);
            window.history.go(-1);
        } catch(err) {

        }
    }

    const previousPage = () => {
        window.history.go(-1);
    }

    return(
        <div className="add-courses-page">
            <div className="add-courses-component">
                <h2 className="header">Add Course</h2>
                <input className="title" type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
                <input className="desc" type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} />
                <button className="previous-btn" onClick={previousPage}>Cancel</button>
                <button className="add-course-btn" onClick={addCourse}>Submit</button>
            </div>
            
        </div>
    )
}

export default AddCourse