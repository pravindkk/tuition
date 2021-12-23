import { BrowserRouter, Route } from "react-router-dom"
import { useEffect } from "react"
import { Auth } from "aws-amplify"

import SignIn from "./login/SignIn"
import SignUp from "./login/SignUp"
import MainPage from "./MainPage"

import SpecificCourse from './specific-course-components/SpecificCourse'
import AddCourse from './course-components/AddCourse'
import UpdateUserCourse from "./course-components/UpdateUserCourse"

import VideoForm from "./specific-course-components/VideoForm"


const MainRouter = () => {

    const checkUser = async() => {
        // console.log(window.location.pathname);
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
            try {
                const user = await Auth.currentAuthenticatedUser();
                // console.log(user);
                

                return true;
            } catch(err) {
                console.log(err);
                window.location.pathname = "/login";
            }
        }
        
    }

    useEffect(() => {
        checkUser()
    }, [])

    return(
        <div>
            <BrowserRouter>
                <Route path="/login" component={SignIn} />
                <Route path="/home" component={MainPage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/courses/:id">
                    <SpecificCourse />
                </Route>
                <Route path="/add-video/:id">
                    <VideoForm />
                </Route>
                <Route path="/add-course" component={AddCourse} />
                <Route path="/update-courses" component={UpdateUserCourse} />
            </BrowserRouter>
            
        </div>
    )

}

export default MainRouter