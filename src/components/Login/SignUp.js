import { Auth } from 'aws-amplify';

import { useState, useEffect } from 'react';

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [authCode, setAuthCode] = useState('')
    const [formType, setFormType] = useState('')

    useEffect(() => {
        setFormType('signUp')
    }, [])

    
    const handleSignUp = async() => {
        if (username === '' || password === '' || email === '') {
            alert("Empty Fields")
            return;
        }
        await Auth.signUp({ username, password, attributes: { email }})
        setFormType('confirmSignUp')
    }

    const confirmSignUp = async() => {
        await Auth.confirmSignUp(username, authCode)
        window.location.pathname = "/login"
    }

    const handleSignIn = () => {
        window.location.pathname = "/login"
    }

    return(
        <div>
            {
            formType === 'signUp' && (
                <div className='sign-up-details'>
                    <h2>Sign Up</h2>
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
                    <input 
                        type="text" 
                        placeholder='Email' 
                        onChange={e => setEmail(e.target.value)} 
                        className='email'
                    />
                    <button 
                        onClick={handleSignUp}
                        className='sign-up-btn'
                    >
                        Sign Up
                    </button>
                    <h3>Already have an account? 
                        <button 
                            onClick={handleSignIn}
                            className='sign-in-btn'
                        >
                            Sign In
                        </button>
                    </h3>
                </div>
            )}
            {
                formType === 'confirmSignUp' && (
                    <div className='confirm-sign-up'>
                        <h2>Confirm Sign Up</h2>
                        <input 
                            name="authCode" 
                            type="password" 
                            onChange={e => setAuthCode(e.target.value)} 
                            className='auth-code'
                            placeholder='Authentication Code'
                        />
                        <button 
                            onClick={confirmSignUp}
                            className='confirm-sign-up-btn'
                        >
                            Sign Up
                        </button>
                    </div>
            )}
        </div>
    )
}

export default SignUp