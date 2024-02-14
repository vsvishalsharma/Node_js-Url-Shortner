const express=require('express');
const port=8000;
const app=express();
const path=require("path");
const url=require("./model/urlmodel.js");
const {connectToMongo}=require('./connect.js');

const urlroute=require('./router/url.js');
const userroute=require('./router/user.js');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/url",urlroute);
app.use("/user",userroute);
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
connectToMongo('mongodb://localhost:27017/url-shortner');

app.get("/test", async (req, res) => {
    try {
        const allUrls = await url.find({});
        return res.render("home", { urls: allUrls });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
});

app.get("/signup",async(req,res)=>{
    return res.render("signup")
})
app.get("/",(req,res)=>{
    return res.render("login");
})

app.listen(port,()=>{console.log("server started at port",port)})