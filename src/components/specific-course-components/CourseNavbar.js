import { Auth } from "aws-amplify"
import { useEffect } from "react"

const CourseNavBar = (props) => {
    useEffect(() => {
        const checkUser = async() => {
            const user = await Auth.currentAuthenticatedUser();
            const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
            if (groups === undefined) {
                return;
            }
            if (groups[0] === 'admin') {
                document.getElementById('add-video-btn').hidden = false;
            }
        }
        checkUser()
    }, [])

    const handleAddVideo = () => {
        window.location.pathname = `/add-video/${props.id}`
    }
    return (
        <div className="course-navbar">
            <h2>{props.id}</h2>
            <button id="add-video-btn" onClick={handleAddVideo} hidden>Add Video</button>
        </div>
    )
}

export default CourseNavBar