const mongoose=require('mongoose');
function connectToMongo(url){
    mongoose.connect(url).then(()=>{console.log("connected to mongodb")});
}
module.exports={
    connectToMongo
};