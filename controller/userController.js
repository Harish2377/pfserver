const users = require("../models/userSchema");
const jwt = require('jsonwebtoken')



//register
exports.register = async (req,res)=>{
    console.log('Inside register controller function');
    const {username,email,password} = req.body
    // console.log(`${username}, ${email}, ${password}`);

   try{ const existingUser = await users.findOne({email})
    if (existingUser) {

        res.status(406).json("Account already Exist! Please Login")

        
    }else{
        //object for already created model for insert data
        const newUser = new users({

            username,email,password,github:"",linkedin:"",profile:""

        })

        //upload model to mongodb atlas using mongoose save() method
        await newUser.save()

        res.status(200).json(newUser)
    }}
    catch(err){
        res.status(401).json(`Register API Failed, Error:${err}`)
    }

   

}

// login controller function
exports.login = async (req, res) => {
    console.log('Inside login controller function');
    const { email, password } = req.body;

    try {
        // Check if the user with the given email exists
        const existingUser = await users.findOne({ email,password });

        if (existingUser) {
            const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")
            
                // return a success response with user details
                res.status(200).json({ existingUser, token });
         
        } else {
            // If the user doesn't exist, return an error response
            res.status(404).json( `Incorrect Email / Password` );
        }
    } catch (err) {
        // If an error occurs during the login process, return an error response
        res.status(500).json({ error: `Login API failed. Error: ${err}` });
    }
};


//editUser
exports.editUser = async (req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile

    try {
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile:uploadImage
        },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
        
    } catch (err) {
        res.status(401).json(err)
        
    }

}