var AuthMiddleWare = {
    handler: (req, res, next) => {
        if (req.headers.hasOwnProperty("authorization")) {
            AuthMiddleWare.authenticateUser(req.headers.authorization, (authticated) => {
                if (authticated) {
                    next();
                }
                else {
                    AuthMiddleWare.handleAuthError(res);
                }
            });
        }
        else {
            AuthMiddleWare.handleAuthError(res);
        }
    },
    handleAuthError: function (res) {
        res.status(401).send("Unauthorized User");
    },
    authenticateUser: function (token, callback) {
        if (token === "abcdefg1234567") {
            callback ? callback(true) : false;
        }
        else {
            callback ? callback(false) : false;
        }
    }
}

module.exports = AuthMiddleWare.handler;