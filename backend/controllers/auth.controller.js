import { generateToken } from "../lib/utils.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt"


export const Signup = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All firlds are requrired" });
        }
        if (!name.includes("./admin")) {
            return res.status(400).json({
                message: "You cannot Sigup as admin",
            });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        const user = await Admin.findOne({ email })

        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new Admin({
            name,
            email,
            password: hashedPassword
        })

        if (newUser) {
            // generate jwt token 
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

export const Login = async (req, res) => {
    const { name, password } = req.body;
    try {
        if (!name.includes("./admin")) {
            return res.status(400).json({
                message: "Only admins can login",
            });
        }
        if (!name || !password) {
            res.status(400).json({ message: "All firlds are requrired" })
        }
        const user = await Admin.findOne({ name });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid credentials" })
        }
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })

    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ message: "Internal servar Error" })
    }
};

export const Logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({
            success: true,
            message: "Logged out"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal error"
        })
    }
};