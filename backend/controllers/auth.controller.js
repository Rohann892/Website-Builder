import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const googleAuth = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,
                email,
                avatar,

            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

        return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000
        }).status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: user
        })
    } catch (error) {
        console.error("Google Auth Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "internal server error",
            error: error.message 
        });
    }
}


export const logout = async (_, res) => {
    try {
        return res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        }).status(200).json({
            success: true,
            message: 'User logged out successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal server error logout failed ${error.message}`
        })
    }
}