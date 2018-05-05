import axios from '../../apiServer';



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
