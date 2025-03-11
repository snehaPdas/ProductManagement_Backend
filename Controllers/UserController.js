const User=require("../model/UserModel")
const bcrypt=require("bcrypt")


///////
const signup=async(req,res)=>{
    try {
        const existingUser=await User.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).json({status:false,message:"user already exist"})
        }else{
            const hashedpassword=await bcrypt.hash(req.body.password,10)
            const newUser=new User({
                name:req.body.name,
                email:req.body.email,
                password:hashedpassword
            })
            await newUser.save();
            return res.status(201).json({
                status:true,message:"user has registered successfully"
            })
        }
       

    } catch (error) {
        console.log(error)
    }
}

const login=async(req,res)=>{
    try {
        console.log("for checkinggggggggg")
        const {email,password}=req.body
        const userData=await User.findOne({email})
        if(userData){
            const ismatch=await bcrypt.compare(password,userData.password)
            if(ismatch){
                return res.status(200).json({
                    message:"Login successfully"
                })
            }else{
                return res.status(400).json({ message: "invalid user" });

            }
        }

        
    } catch (error) {
        console.log(error);
    return res.status(500).json({ message: "login error", error });
    }
}







module.exports={
    signup,
    login,
    
    
}