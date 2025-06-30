import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.model.js";


export const register = async (req , res) => {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await user.save();
    res.status(201).json({ message: "User registered successfully", token });
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    const exist = await User.findOne({ email });
    if (!exist) {
        return res.status(400).json({ message: "User Does not exist , SignUp first" });
    }
    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: exist._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "User logged in successfully", token });
}


