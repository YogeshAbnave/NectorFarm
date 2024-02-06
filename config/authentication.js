var jwt = require("jsonwebtoken");
var UserData = require('../app/models/user.model');
var AdminData = require('../app/models/admin.model');

exports.apiAuthentication = function (req, res, next) {
    var token = req.headers.token;
    // jwt.verify(token, 'RESTFULAPIs', { expiresIn: "120" }, (err, decoded) => {
    //     if (decoded) {
    //         return next();
    //     }
    //     return res.status(401).json({ success: false, status: 401, message: err.message })
    // })
    // let token_exists = await UserData.findOne({ "sessionToken": token });
    // if (decoded) {
    //     return next();
    // }
    // return res.status(401).json({ success: false, status: 401, message: err.message });
    if (token) {
        AdminData.findOne({ "sessionToken": token })
        .then(result => {
            if (result) return next();
            else {
                UserData.findOne({ "sessionToken": token })
                .then(userResult => {
                    if (userResult) return next();
                    return res.status(401).json({ success: false, status: 401, message: "Token invalid or expired" });
                }).catch(err => {
                    res.status(500).json({ success: false, status: 500, message: err.message })
                });
            }
        }).catch(err => {
            res.status(500).json({ success: false, status: 500, message: err.message })
        });
    } else return res.status(400).json({ success: false, status: 400, message: "Please provide auth token!" });
}
