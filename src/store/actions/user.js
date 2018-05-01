import axios from '../../apiServer';

// import * as actionTypes from './actionTypes';


// export const userCreate = () => {
//     return {
//         type: actionTypes.USER_CREATE
//     };
// };

// export const userRead = () => {
//     return {
//         type: actionTypes.USER_READ
//     };
// };

// export const userUpdate = () => {
//     return {
//         type: actionTypes.USER_UPDATE
//     };
// };

// export const userDelete = () => {
//     return {
//         type: actionTypes.USER_DELETE
//     };
// };


export const userCreate = (token, userId, name, email, address) => {
    return dispatch => {
        const data = {
            userId: userId,
            name: name,
            email: email,
            address: address
        };

        var options = { headers: { 'Authorization': token } };
        axios.post('/users', data, options).then(response => {
            console.log(response); // Nothing to do
        }).catch(err => {
            console.log(err); // fails silently
        });
    };
};
