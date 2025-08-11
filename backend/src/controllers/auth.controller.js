import User from "../models/user.model";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
  try {
    //hash password
    if(password.length<=6){
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    }
    const user = await User.findOne({email})

    if(user){
        return res.status(400).json({message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        name:name ,
        email:email,
        password: hashedpassword
    });

    await newUser.save();
    res.status(201).json({message: "User created successfully"});
  } catch (error) {
    
  }
};

export const login = (req, res) => {
  res.send("User logged in");
};

export const logout = (req, res) => {
  res.send("User logged out");
};
