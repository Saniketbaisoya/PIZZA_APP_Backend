const mongoose = require('mongoose');
const bcrypt =   require('bcrypt');
//Mtlb koi bhi user jb create hoga or we can say uss user ke corresponding jo data create hoga voh data kiss design mai store hoga ,
// us schema ki designing hmm niche userSchema mai krege....
// Now yeah schema object-oriented manner mai create hoga and then yeah code phr mongodb se interact krke data ke corresponding CRUD ops perform hoge in DataBase....
const userSchema = new mongoose.Schema({
    firstName :{
        type: String,
        required : [true,"First Name is Required..."],
        minlength : [6 ,"First Name must be atleast 8 character long..."],
        lowercase : true ,
        trim : true , // if the user give extra spaces then it will automatically remove it....
        maxlength : [20,"First Name should be less than or equal to 20 characters..."]
    },
    lastName : {
        type : String,
        required : [true,"Last Name should be Required..."],
        minlength : [6,"First Name must be atleast 8 character long..."],
        lowercase : true,
        trim : true, // if the user gives extra spaces then it will automatically removes it....
        maxlength : [20,"Last Name should be less than or equal to 20 characters..."]
    },

    mobileNumber : {
        type : String ,
        trim : true ,
        unique : [true,"Phone Number is already in use..."],
        required : [true ,"Phone number should be required..."]
    },
    email : {
        // abc123@gmail.com // different format ke combinations ki grouping ek jgh krni hai email ke liye
        type :  String,
        trim : true,
        required : [true,"Email should be provided..."],
        unique : [true,"Email is already in use...."],
        //validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    },
    password : {
        type: String, 
        required: [true,"Password should be required..."]
    }
    
},{
    timestamps : true,
})
// Now iss case mai hmme , password ko hashing krke aage bejna hai....
userSchema.pre('save',async function (){
    console.log("Pre hook function executed after schema....");
    console.log(this);// Now abhi userSchema ka use krke maine pre hook function create kiya toh this ke liye call site hogya userSchema toh uska pura access this ke andr hoga....
    const hashPassword = bcrypt.hash(data = this.password,saltOrRounds =10);
    this.password = hashPassword;
    console.log("Exiting the pre hook fucntion....");
})
// Now abb User ka collection in mongoDB created ho jayega and abb agr koi bhi collection ka schema bnega toh voh User variable ko use krke hi bnega kyuki iss variable ke andr hmne define krdiya hai userSchema ko 
// and isme hmne mongoose ke model function ka use krke yeah kiya hai jisse jo bhi collection bnega voh jake mongoDB mai jake bne....
const User = mongoose.model("User",userSchema); 

module.exports = User;



