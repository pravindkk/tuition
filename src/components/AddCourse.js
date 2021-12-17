import { DataStore } from "@aws-amplify/datastore"
import { Course } from '../models'
import { useState, useEffect } from "react"
import { Auth } from "aws-amplify"

const AddCourse = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const checkUser = async() => {
            const user = await Auth.currentAuthenticatedUser();
            const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
            if (groups.includes('admin') === false) {
                window.history.go(-1);
            }
        }
        checkUser()
    },[])

    const addCourse = async() => {
        try {
            const course = await DataStore.save(
                new Course({
                    "title": title,
                    "description": description,
                    "videos": []
                })
            )
            console.log(course);
            window.history.go(-1);
        } catch(err) {

        }
    }

    return(
        <div>
            <h2>Add Course</h2>
            <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} />
            <button onClick={addCourse}>Submit</button>
            
        </div>
    )
}

export default AddCourse