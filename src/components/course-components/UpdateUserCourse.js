import { DataStore, Auth } from "aws-amplify";
// import { useParams } from "react-router-dom";
import { User, Course } from '../../models'
import React, { useEffect, useState } from "react";


const UpdateUserCourse = () => {
    const [users, setUsers] = useState([])
    const [courses, setCourses] = useState([])
    const [selectUser, setSelectUser] = useState('')
    const [selectedUserCourses, setSelectedUserCourses] = useState([])

    const getUserCourses = async() => {
        // console.log(selectUser);
        try {
            
            const user = await DataStore.query(User,selectUser);
            // console.log(user)
            // setSelectedUserCourses([...selectedUserCourses, user.courses]);
            user.courses.map(course => {
                selectedUserCourses.push(course)
            })
            // console.log(selectedUserCourses);
            // console.log(courses);
            test()
            // user.courses.map(course => {
            //     console.log(course);
            // })
        } catch(err) {

        }
        
        // console.log(user);
        // user.courses.map(course => {
        //     console.log(course);
        // })
    }

    const test = () => {
        courses.map(course => {
            document.getElementById(course.id).checked = false
        })
        courses.map(course => {
            // console.log(course);
            selectedUserCourses.map(userCourses => {
                if (course.id === userCourses) {
                    document.getElementById(course.id).checked = true
                }
            })
        })
    }

    useEffect(() => {
        const checkUser = async() => {
            const user = await Auth.currentAuthenticatedUser();
            const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
            if (groups === undefined) {
                window.history.go(-1);
            }
        }
        checkUser()
        setSelectedUserCourses([]);
        const getUsers = async() => {
            try {
                const users = await DataStore.query(User)
                // console.log(users);
                setSelectUser('null')
                // setSelectUser(users[0].id)
                setUsers(users)
            } catch(err) {
                console.log(err);
            }
        }
        const getCourses = async() => {
            try {
                const courses = await DataStore.query(Course)
                // console.log(courses);
                setCourses(courses)
                // console.log(courses);
            } catch(err) {
                console.log(err);
            }
            // console.log(courses);
        }
        
        getUsers()
        getCourses()
        // getUserCourses()
        
    },[])
    
    const handleUserChange = (e) => {
        setSelectUser(e.target.value)
        setSelectedUserCourses([]);
    }

    const handleCourseChange = () => {
        
        if (selectUser === 'null') {
            alert('Please select a user')
        }
        getUserCourses()
        // document.getElementsByClassName("select-courses").map(course => {
        //     course.hidden = false
        // })
        // console.log(document.getElementsByClassName("select-courses"))
        var testElements = document.getElementsByClassName('select-courses-checkbox');
        Array.prototype.filter.call(testElements, function(testElement){
            // console.log(testElement);
            testElement.removeAttribute("disabled")
        });
        // updateUserCourse()
    }

    const handleUpdateCourses = async() => {
        try {
            const modelToUpdate = await DataStore.query(User, selectUser);
            await DataStore.save(User.copyOf(modelToUpdate, updated => {
                updated.courses = selectedUserCourses
            }))
            window.location.reload()
        } catch(err) {
            console.log(err);
        }
        // console.log();
    }

    // const updateUserCourse = async() => {
    //     const modelToUpdate = await DataStore.query(User, selectUser);
    //     try {
    //         /* Models in DataStore are immutable. To update a record you must use the copyOf function
    //         to apply updates to the item’s fields rather than mutating the instance directly */
    //         await DataStore.save(User.copyOf(modelToUpdate, updated => {
    //             updated.courses.push('Science');
    //             // Update the values on {item} variable to update DataStore entry
    //         }));
    //     } catch(err) {
    //         console.log(err);
    //     }
    //     console.log(modelToUpdate);
    // }

    const handleCheckboxChange = (e) => {
        if (document.getElementById(e.target.value).checked === true) {
            if (selectedUserCourses.includes(e.target.value) === false) {
                selectedUserCourses.push(e.target.value)
            }
        } else if (document.getElementById(e.target.value).checked === false) {
            if (selectedUserCourses.includes(e.target.value) === true) {
                const index = selectedUserCourses.indexOf(e.target.value);
                if (index > -1) {
                selectedUserCourses.splice(index, 1);
}
            }
        }
        console.log(e.target.value);
        console.log(selectedUserCourses);
    }

    const handleCancel = () => {
        window.history.go(-1)
    }

    return (
        <div className="update-courses-page">
            <div className="update-courses-component">
                <h2>Update Courses</h2>
                <select
                    onChange={handleUserChange} 
                    className="select-courses"
                >
                    <option value='null'></option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.username}</option>   
                    ))}
                </select>
                <button className="get-courses-btn" onClick={handleCourseChange}>Get Courses</button>
                <div className="all-course-list">
                {courses.map(course => (
                    <div key={course.id} className="select-courses-list">
                        <input className="select-courses-checkbox" type="checkbox" value={course.id} id={course.id} onChange={e => handleCheckboxChange(e)} disabled="disabled"/>
                        <h3>{course.title}</h3>
                    </div>
                ))}
                </div>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                <button className="update-btn" onClick={handleUpdateCourses}>Submit Changes</button>
            </div>
        </div>
    )
}

export default UpdateUserCourse