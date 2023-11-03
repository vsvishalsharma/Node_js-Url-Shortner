const express=require('express');
const app=express();
app.get('/',(req,res)=>{//phle request aati h phir response
    return res.send("Hello You Are At HomePage");
})
app.get('/about',(req,res)=>{
    return res.send('You reached the about page');
})
app.listen(8000,()=>console.log("server started"));