import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.js";

// ------------------ Signup ------------------
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save & send response
    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilepic || null,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------ Login ------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilepic || null,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------ Logout ------------------
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------ Update Profile ------------------

// export const updateProfile = async (req, res) => {
//   try {
//     const { name, password, profilePic } = req.body;
//     const userId = req.user._id;
    
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });
    
//     // Update name
//     if (name) user.name = name;
    
//     // Handle Base64 image
//     console.log("Incoming profilePic length:", profilePic?.length);
//     if (profilePic) {
//       // Strip prefix if exists (e.g. "data:image/png;base64,...")
//       const base64Data = profilePic.startsWith("data:")
//         ? profilePic.split(",")[1]
//         : profilePic;

//       const uploadResponse = await cloudinary.uploader.upload(
//         `data:image/png;base64,${base64Data}`, // always valid format
//         { folder: "profiles" }
//       );

//       user.profilepic = uploadResponse.secure_url;
//     }

//     // Handle password
//     if (password) {
//       if (password.length < 6) {
//         return res
//           .status(400)
//           .json({ message: "Password must be at least 6 characters long" });
//       }
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }

//     const updatedUser = await user.save();

//     res.status(200).json({
//       message: "Profile updated successfully",
//       user: {
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         profilePic: updatedUser.profilepic || null,
//       },
//     });
//   } catch (error) {
//     console.error("Error in updateProfile:", error);
//     res.status(500).json({ message: "Profile upload failed", error: error.message });
//   }
// };


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, profilePic, password } = req.body;

    const updateFields = {};

    if (name) updateFields.fullName = name;
    if (profilePic) updateFields.profilePic = profilePic;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ message: "Server error updating profile" });
  }
};


// ------------------ Check Auth ------------------
export const checkAuth = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in checkAuth controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


