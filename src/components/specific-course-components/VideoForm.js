import { useState, useEffect } from "react"
import { DataStore } from '@aws-amplify/datastore';
import { Storage, Auth } from "aws-amplify";
import { Video } from '../../models';


export default function VideoForm(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [order, setOrder] = useState(0)
    const [videoFile, setVideoFile] = useState('')

    const [progress, setProgress] = useState(0);
    const [progressTotal, setProgressTotal] = useState(0);

    const checkUser = async() => {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
        if (groups === undefined) {
            window.history.go(-1)
            return;
        }
        if (groups.includes('admin') === true) {
            document.getElementById('add-video').hidden = false;
        }
    }

    useEffect(() => {
        checkUser()
    },[])

    const handleSubmit = async (e) => {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
        if (groups === undefined) {
            alert('Not admin')
            return;
        }
        e.preventDefault()
        const video = await DataStore.save(
            new Video({
                title,
                description,
                order,
                courseID: props.courseId
            })
        );
        await Storage.put(video.id, videoFile ,{
            progressCallback(progress) {
                setProgress(progress.loaded)
                setProgressTotal(progress.total)
                console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
              },
        })
        document.getElementById('input').value = ''
        setProgress(0)
    }

    return(
        <div id="add-video" hidden>
            <form onSubmit={e => handleSubmit(e)}>
                <input id="input" type="text" onChange={e => setTitle(e.target.value)} placeholder="title" />
                <input id="input" type="text" onChange={e => setDescription(e.target.value)} placeholder="description" />
                <input type="number" onChange={e => setOrder(parseInt(e.target.value))} placeholder="order" />
                <input 
                    type="file" 
                    accept=".mov, .mp4" 
                    onChange={e => setVideoFile(e.target.files[0])} />
                <button type="submit" value='create video'>submit</button>
                <progress value={progress} max={progressTotal}></progress>
                
            </form>
        </div>
    )
}