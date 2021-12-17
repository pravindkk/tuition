import SignOut from "./Login/SignOut"
// import App from '../App'

import Courses from "./Courses"

const MainPage = () => {
    return(
        <div>
            <SignOut />
            <Courses />
            {/* <App /> */}
        </div>
    )
}

export default MainPage