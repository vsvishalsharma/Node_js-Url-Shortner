/*//stateFUll auth
const sessionIdToUserMap=new Map();
function setUser(id,user){
    sessionIdToUserMap.set(id,user);
}
function getUser(id){
    return sessionIdToUserMap.get(id);
}*/

//stateless
const jwt=require("jsonwebtoken");
const secret="url@shortner@node";
function setUser(id, user) {
    const payload = {
        userId: id,
        userData: user,
    };

    // Replace 'your-secret-key' with your actual secret key
    const token = jwt.sign(payload, secret);
    return token;
}
function getUser(token){
    if(!token){
        return null;
    }
    return jwt.verify(token,secret);
}
module.exports={
    setUser,
    getUser,
}