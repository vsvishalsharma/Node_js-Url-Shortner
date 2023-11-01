const http=require("http");
const fs=require("fs");
const url=require("url");
const my_server=http.createServer((req,res)=>{
    const log=`${Date.now()}: '${req.url} New Request Received\n`;
    fs.appendFile("log.txt",log,(err,data)=>{
        if(!err){
            const myurl=url.parse(req.url,true);
            console.log(myurl);
            switch(myurl.pathname){
                case"/":
                    res.end("Welcome to HomePage");
                    break;
                case"/about":
                    const user=myurl.query.username;
                    res.end(`Hello ${user}`);
                    break;
                default:
                    res.end("404 Not Found");
                    break;   
            }
    }
    })
})
my_server.listen(8000,()=>console.log("Server Started"));