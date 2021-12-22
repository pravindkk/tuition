import { DataStore, Auth } from "aws-amplify";
import React from "react";
import { Course, User } from "../models";
import { Link } from "react-router-dom"

class ShowCourses extends React.Component {
    constructor(props) {
        //IMPLEMENT OTHER JUNK HERE
        super(props);
        this.state = {
            data: null,
            userCourses: [],
            courses: [] //This is what our data will eventually be loaded into
        };
    }
    componentDidMount() {
        this.loadData();
    }
    async loadData() {
        const currentUser = await Auth.currentAuthenticatedUser();
        const groups = currentUser.signInUserSession.accessToken.payload["cognito:groups"];
        if (groups === undefined) {
            
            try {
                const users = await DataStore.query(User)
                users.map(user => {
                    if (user.username === currentUser.username) {
                        user.courses.map(course => {
                            this.state.userCourses.push(course)
                        })
                    }
                })
            } catch(err) {
                console.log(err);
            }

            try {
                const models = await DataStore.query(Course)
                models.map(course => {
                    this.state.userCourses.map(userCourse => {
                        // console.log(userCourse);
                        if (course.id === userCourse) {
                            // console.log('hi');
                            if (!this.state.courses.includes(course)) {
                                this.state.courses.push(course)
                            }
                        } 
                    })
                })
                // console.log(this.state.courses);
                this.setState({
                    data: 1
                });
            } catch(err) {
                console.log(err);
            }
        } else if (groups[0] === 'admin') {
            try {
                const models = await DataStore.query(Course)
                models.map(course => {
                    if (!this.state.courses.includes(course)) {
                        this.state.courses.push(course)
                    }
                })
                // console.log(this.state.courses);
                this.setState({
                    data: 1
                });
            } catch(err) {
                console.log(err);
            }
            document.getElementById('add-course-btn').hidden = false;
            document.getElementById('update-course-btn').hidden = false;

        }
        
    }
    render() {
        if (!this.state.data) {
            return <div />
        }

        //WE HAVE DATA, DO A NORMAL RENDER
        return (
            <>
                {this.state.courses.map(course =>(
                    <div key={course.id} className="specific-course" style={{
                        paddingTop: 0
                    }}>
                        <Link className="title" to={`/courses/${course.title}`}>{course.title}</Link>
                        <p className="desc">{course.description}</p>
                    </div>
                ))}
            </>
        );
    }
}

export default ShowCourses