import React, { useRef } from 'react';

const Contact = () => {

    const email = useRef()
    const password = useRef()

    const registerHandler = (e) => {
        e.preventDefault()
        console.log(email.current.value)
        console.log(password.current.value);
        localStorage.setItem('emailData', email.current.value)
        localStorage.setItem('passwordData', password.current.value)
    }

    return (
        <div className='container'>
            Contact page
            <form className='form-group'>
                <input className='' name='email' ref={email} />
                <input name='password' ref={password} />
                <button onClick={e => registerHandler(e)}>Register</button>
            </form>
        </div>
    );
}

export default Contact;
