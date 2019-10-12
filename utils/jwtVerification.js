const jwt = require('jsonwebtoken');

function jwtVerify(req, res, next) {

    const { token } = req.headers;

    if (!token) {
        return res.json({
            error: {
                message: "no_token_provided"
            }
        });
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res.json({
                error: {
                    message: "token_authentication_failed"
                }
            });
        }
        next();
    });
}

module.exports = jwtVerify;