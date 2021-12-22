import ShowCourses from "./ShowCourses";


const Courses = () => {

    const addCourse = async() => {
        window.location.pathname = '/add-course'
        // console.log(courses);
    }

    const updateCourse = async() => {
        window.location.pathname = '/update-courses'
    }

    // const deleteCourse = async(id) => {
    //     const modelToDelete = await DataStore.query(Course, id);
    //     const del = await DataStore.delete(modelToDelete);
    //     window.location.reload()
    // }

    // const updateUserCourse = async() => {
    //     const modelToUpdate = await DataStore.query(User, userId);
    //     try {
    //         /* Models in DataStore are immutable. To update a record you must use the copyOf function
    //         to apply updates to the item’s fields rather than mutating the instance directly */
    //         await DataStore.save(User.copyOf(modelToUpdate, updated => {
    //             updated.courses.push('Maths');
    //             // Update the values on {item} variable to update DataStore entry
    //         }));
    //     } catch(err) {
    //         console.log(err);
    //     }
    //     console.log(modelToUpdate);
    // }
    
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

            <ShowCourses />     
            
            <button id="add-course-btn" className="course-btn" onClick={addCourse} hidden>Add Course</button>
            <button id="update-course-btn" className="course-btn" onClick={updateCourse} hidden>Update Course</button>
            {/* <Link className="title" to={`/update-courses`}>Update Course</Link> */}
            {/* <button onClick={updateUserCourse} hidden>Update Course</button> */}
            
        </div>
    )
    
}

export default Courses