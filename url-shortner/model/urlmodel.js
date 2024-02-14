const mongoose=require('mongoose');

const urlSchema= new mongoose.Schema(
    {
        ShortId:{
            type:String,
            required:true,
            unique:true
        },
        RedirectUrl:{
            type:String,
            required:true
        },
        visited: [{ timestamp: { type: Number } }],
        clicks: {
            type: Number,
            default: 0
        }
    },
    {timestamps:true}
);
const url=mongoose.model("url",urlSchema);

module.exports=url;