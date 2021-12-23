import SignOut from "./login/SignOut"
// import App from '../App'

import Courses from "./course-components/Courses"

const MainPage = () => {
    return(
        <div className="main-page">
            <SignOut />
            <Courses />
            {/* <App /> */}
        </div>
    )
}

export default MainPage