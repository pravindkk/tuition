import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';

const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, updateUser] =  useState(null)

    useEffect(() => {
        const checkUser = async() => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                window.location.pathname = "/home";
                // console.log(user);
                return true;
            } catch(err) {
                // console.log(err);
                // window.location.pathname = "/login";
            }
        }
        checkUser()
    }, [])
    
    const handleSignIn = async () => {
        try {
            const user = await Auth.signIn(username, password)
            window.location.pathname = "/home"
            console.log(user);
            updateUser(user)
        } catch(err) {
            console.log(err);
        }
            
            window.location.pathname = "/home"

            
    }

    const handleSignUp = () => {
        window.location.pathname = "/signup"
    }

    return(
        <div className='login-details'>
            <h2>tuiBot</h2>
            <div className='sign-in-form'>
                <h4>Login</h4>
                <input 
                    type="text" 
                    placeholder='Username' 
                    onChange={e => setUsername(e.target.value)} 
                    className='username'
                />
                <input 
                    type="text" 
                    placeholder='Password' 
                    onChange={e => setPassword(e.target.value)} 
                    className='password'
                />
                <button 
                    className='sign-in-btn'
                    onClick={handleSignIn}
                >
                    Sign In
                </button>
            </div>
            <h3>Dont have a account? 
            <button 
                className='sign-up-btn'
                onClick={handleSignUp}
            >
                SignUp
            </button>
            </h3>
        </div>
    )
}

export default SignIn