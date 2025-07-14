const authService = require("../service/authService");

async function loginUser(req,res) {
    
    try {
        console.log("loginUser come under this....")
        const loginPayload = req.body;

        const loginService = await authService(loginPayload);
        console.log(loginService);
        return res.status(200).json({
            success : true,
            message : "Successfully logged with this email....",
            data : loginService,
            error : {}
        })
    } catch (error) {
        return res.status(404).json({
            success : false,
            message : "User with this email not found",
            data : {},
            error : {error}
        })
    }
}

module.exports = loginUser;