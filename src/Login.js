import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './Firebase'
import './Login.css'
import { actionTypes } from './Reducer'
import { useStateValue } from './StateProvider'
function Login() {

    const [{}, dispatch] = useStateValue()

    const signin = () =>{
        auth
            .signInWithPopup(provider)
            .then((result) => dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            }))
            .catch((error) =>alert(error.message))
    }

    return (
        <div className='login-container'>
            <div className='image'>
                <img 
                    src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
                    alt='whatsapp_image'
                />
            </div>
            <div className='signin'>
                Sign in to Whatsapp
            </div>
            <div className='button'>
                <Button type = 'submit' onClick={signin}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
