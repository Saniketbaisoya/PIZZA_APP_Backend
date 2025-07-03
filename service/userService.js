const {findUser,createNewUser} = require("../repository/userRepository");
// class UserService { // classes based syntaxes ke through serviceLayer define hui...

    // constructor(_userRepository){
    //     // in this argument we will expect the userRepository object...
    //     this.userRepository = _userRepository;
    // }

    async function registeredUser(userDetails){ 
        console.log("Hitting the service layer....");
        // console.log(this.userRepository);
        // console.log(this.userRepository.findUser);
        // console.log(this.userRepository.createNewUser);
        // it will create the brand new user in the db...
        // buisness logic :
       // 1. We need to check if the user with this data(req.body) already exists or not...
        const user = await findUser({
            email : userDetails.email,
            mobileNumber : userDetails.mobileNumber
        })

        if(user){ // we found a user....
            throw{reason : "User with the given email and mobileNumber already exists....",statusCode : 400};
        }
 
       // 2. if not then createUser in the db
        const newUser = await createNewUser({
            firstName : userDetails.firstName,
            lastName : userDetails.lastName,
            mobileNumber : userDetails.mobileNumber,
            email : userDetails.email,
            password : userDetails.password
        })
        console.log(newUser);
        if(!newUser){ // if user is not created , toh phr user ke details mai problem hai jisse voh user create nhi hua and agr voh create hi ni hua toh voh registered hi nhi hoga application architecture prr....
            throw{reason :"Something went wrong, cannot create the user....",statusCode : 500};
        }
       // 3. return the user with this userDetails....
       return newUser;
    }
//}
// module.exports = UserService;
module.exports = registeredUser;