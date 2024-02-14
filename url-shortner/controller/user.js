const User = require("../model/usermodel.js");
const {v4: uuidv4}=require('uuid');
const {setUser}=require('../services/auth.js')
async function handleSingup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Provide all details" });
    }
    await User.create({
        name,
        email,
        password,
    });
    return res.render("home");
}

async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.find({
        email:email,
        password:password,
    });
    console.log(user);
    if (!user) {
        return res.render("signup",{error:"invalid email or password"});
    }
    const token=setUser(user);
    res.cookie("uid",token);
    return res.render("home");
}

module.exports = {
    handleSingup,
    handleLogin,
};
