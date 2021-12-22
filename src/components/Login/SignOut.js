import React from "react";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";


const SignOut = () => {
    const [username, setUsername] = useState('')
    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async() => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            // console.log(user);
            setUsername(user.username)
            return true;
        } catch(err) {
            console.log(err);
            window.location.pathname = "/login";
        }
    }

    const handleSignOut = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            // console.log(user);
            await Auth.signOut({ global: true });
            window.location.pathname = "/login";
            // console.log(user);
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    return (
        <div className="navbar">
            <button 
                onClick={handleSignOut}
                className="sign-out-btn"
            >
                Sign Out
            </button>
            <h2 
                className="welcome-back-banner"
            >
                Welcome back, 
                <span> {username}</span>
            </h2>

        </div>
    )
}

export default SignOut;