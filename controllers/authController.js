const authService = require("../service/authService.js"); // 1change


async function loginUser(req,res) {
    
    try {
        console.log("controller request ",req.body);
        const loginPayload = req.body;
        // response mai token milega and yeah token user.email and use._id ka use krke hmne create krvya hai again agr isme password rkhte toh problems aati security se...
        // Also yeah token tbhi create hoga jb loginUser ke andr aane vale email or password req.body.data compare kiya jayega and compare bhi tb hoga jb voh email agr exists kregi tb hmm normal password jo email ke sth ayi thi voh and hashPassword dono ko compare krege tb hi
        // agr compare hogye toh token generate kr dege with jwt_expiry and isse phr usse user under expiry login krlega directly without login again with email and password....
        const response = await authService(loginPayload);

        res.cookie("token",response,{
            httpOnly: true,
            secure: false,
            maxAge : 7 * 24 * 60 * 60 * 10000 // 10000 ms life hogyi token ki
        })
        return res.status(200).json({
            success : true,
            message : "Successfully logged with this email....",
            data : {response},
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

module.exports = loginUser