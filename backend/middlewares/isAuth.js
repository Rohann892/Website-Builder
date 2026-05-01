import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("No token found in cookies");
            return res.status(400).json({
                success: false,
                message: 'unauthorized'
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: 'invalid token'
            })
        }

        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            console.log("User not found for id:", decoded.id);
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal server error -  ${error}`
        })
    }
}

export default isAuth;