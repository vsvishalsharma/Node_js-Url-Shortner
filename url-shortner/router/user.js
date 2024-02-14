const express=require('express');
const router=express.Router();
const {handleSingup,handleLogin}=require('../controller/user')

router.post("/singup",handleSingup);
router.get("/login",handleLogin);
module.exports=router;