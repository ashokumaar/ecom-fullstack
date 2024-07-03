// import React, { useState, useEffect } from 'react';
// import { userProfile } from '../APIs/AuthServiceAPIs';
// import { decodeToken, isExpired } from 'react-jwt'
// import { useNavigate } from 'react-router-dom';
// import LoginForm from './LoginForm';
// import { useUserContext } from './UserContext';

// // const jwtToken = localStorage.getItem('token')

// const UserProfile = () => {
//     const [userInfo, setUserInfo] = useState(null)
//     const navigate = useNavigate()
//     // const jwtToken = useContext(UserContext)
//     const { jwtToken } = useUserContext();

//     const myDecodedToken = decodeToken(jwtToken)
//     const isMyTokenExpired = isExpired(jwtToken)

//     useEffect(() => {
//         console.log('jwtToken ::: ', jwtToken);
//         console.log('myDecodedToken ::: ', myDecodedToken)
//         console.log('isMyTokenExpired ::: ', isMyTokenExpired);
//         if (jwtToken && !isMyTokenExpired) {
//             getUserProfile(jwtToken);
//         } else if (jwtToken) {
//             alert("your session has expired, please login again ")
//             sessionStorage.setItem('SessionExpired',true);
//             localStorage.removeItem('token')
//             navigate('/')
//         } else {
//             // localStorage.removeItem('token')
//             navigate('/auth/user/userProfile')
//         }
//     }, [jwtToken])

//     const getUserProfile = async () => {
//         let response = await userProfile(jwtToken)
//         console.log("Coming from backend :: ", response.data);
//         setUserInfo(...response.data);
//     }

//     return (
//         <div className='container'>
//             {
//                 isMyTokenExpired ? <LoginForm /> :
//                     <h1>{userInfo}</h1>
//             }
//         </div>
//     );
// }

// export default UserProfile;
