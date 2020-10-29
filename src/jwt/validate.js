


const ValidateToken = (token, secret) => {

    if (!token) {
        return { message: 'error', res: 'No token provided.' };
    }
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return { message: 'error', res: 'Failed to authenticate token.' };
        }
    });
}
module.exports = ValidateToken;