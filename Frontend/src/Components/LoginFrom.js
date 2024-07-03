import React, { useState } from 'react';

const LoginFrom = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const [emailData, setEmailData] = useState({ email: '', error: '' })
    const [passwordData, setPasswordData] = useState({ password: '', error: '' })

    const handleButtonClick = (e) => {
        e.preventDefault(); // Prevent default form submission

        let hasError = false;
        setEmailData({ ...emailData, error: '' })
        
        if(!((emailData.email).includes('@'))){
            setEmailData({ ...emailData, error: 'missing @ 🤔' })
            hasError = true;
        }
        else if(!((emailData.email).includes('.com')) || !((emailData.email).includes('.com'))){
            setEmailData({ ...emailData, error: 'either missing .com or .in in your email 🤔' })
            hasError = true;
        }

        // Password validation
        if (passwordData.password.length >= 8) {
            if (!(/[A-Z]/.test(passwordData.password))) {
                setPasswordData({ ...passwordData, error: 'Must have atleast one capital case letter (A-z)' })
                hasError = true;
            }
            else if (!(/[a-z]/.test(passwordData.password))) {
                setPasswordData({ ...passwordData, error: 'Must have atleast one small case letter (a-z)' })
                hasError = true;
            }
            else if (!(/[0-9]/.test(passwordData.password))) {
                setPasswordData({ ...passwordData, error: 'Must have atleast one number (0-9)' })
                hasError = true;
            }
            else if (!(/[-_~!@#$%^&*()+={}]/.test(passwordData.password))) {
                setPasswordData({ ...passwordData, error: 'Must have atleast one special symbol (-_~!@#$%^&*()+={})' })
                hasError = true;
            }
        } else {
            setPasswordData({ ...passwordData, error: 'Password should be minimum 8 characters' })
            hasError = true;
        }

        if (!hasError) {
            // Call your submitHandler function here after successful validation
            //   submitHandler(email, password);
            console.log('normal', emailData.email, passwordData.password)
            setUser({ ...user, email: emailData.email, password: passwordData.password })
            console.log('user', user);

        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleButtonClick}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        name="email" value={emailData.email} onChange={e => setEmailData({ ...emailData, email: e.target.value })} placeholder="Enter email" required />
                    {emailData.error && <div className="error-message">{emailData.error}</div>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                        name="password" value={passwordData.password} onChange={e => setPasswordData({ ...passwordData, password: e.target.value })} placeholder="Password" required />
                    {passwordData.error && <div className="error-message">{passwordData.error}</div>}
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleButtonClick}>
                    Submit
                </button>
            </form>


        </div>
    );


}

export default LoginFrom;
