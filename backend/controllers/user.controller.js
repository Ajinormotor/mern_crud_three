import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      const usernameExist = await User.findOne({ username });
      const emailExist = await User.findOne({ email });
  
      if (emailExist) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
  
      if (usernameExist) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }
  
      const hashedPassword = await bcryptjs.hash(password, 10);
  
      const userDoc = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
  
      return res.status(200).json({
        user: userDoc,
        message: "User created successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  

export const Login = async(req,res) => {

    try {

      const { email, password} = req.body

      if(!email || !password){
        res.status(404).json({
          message: "Please fill all filed"
        })
      }

      const userDoc = await User.findOne({email})
      if(!userDoc){
       return res.status(400).json({message: "Invalid credentials"})
      }
const checkPassword =  bcryptjs.compareSync(password,userDoc.password)

if(!checkPassword){
  return  res.status(400).json({message: "Invalid credentials"})
}

//jwt sign

const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});



return res.status(200).json({
  message: " Logged in successfully",
  user: userDoc,
})

  
    } catch (error) {
     return  res.status(500).json({
        message: error.message
      })
      
    }
}



export const fetchUser = async(req,res) => {
  const { token}  = req.cookies

if(!token){ 
  return res.status(401).json({
    message: "No token found"
  })
}
  try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);

if(!decoded){
 return res.status(401).json({
  message: "Invalid token"
 })
}

const userDoc = await User.findById(decoded.id).select("-password") ;

if(!userDoc){
  return res.status(400).json({
    message: "User not found"
  })
}

return res.status(200).json({
  user: userDoc
})
    
  } catch (error) {
    return  res.status(500).json({
      error: error.message
    })
    
  }
}

export const Logout = async(req,res) => {
  res.clearCookie("token")
  res.status(200).json({ message: "Logged out successfully"})

}