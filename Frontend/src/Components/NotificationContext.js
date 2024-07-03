// import React, { createContext, useContext } from 'react';
// import { toast } from 'react-toastify';

// const NotificationContext = createContext();

// export const useNotification = () => useContext(NotificationContext);

// export const NotificationProvider = ({ children }) => {
//     const notify = (message) => {
//         toast(message, {
//             position: "top-right",
//             autoClose: 5000,
//         });
//     };

//     const notifySuccess = (message) => {
//         toast.success(message, {
//             autoClose: 5000,
//         })
//     }

//     const notifyError = (message) => {
//         toast.error(message, {
//             autoClose: 5000,
//         });
//     };

//     return (
//         <NotificationContext.Provider value={{ notify, notifySuccess, notifyError }}>
//             {children}
//         </NotificationContext.Provider>
//     );
// };
