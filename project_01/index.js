const express=require('express');
const users=require('./MOCK_DATA.json');
const fs=require('fs')
const app=express();
const mongo=require('mongoose');

  const PORT=8000;

app.use(express.urlencoded({extended:false }))
//jo middleware uppar vo phle execute hoga
app.use((req, res, next) => {
    fs.appendFile("log.txt",`\n${Date.now()}:${req.method}: ${req.path}`,
    (err, data) => {
    next();
    }
    ); 
});
//MVC pattern is basically :
//controllers i.e our routes and req methods manipulating 
//our model i.e user schema and user model to update 
//views i.e frontend seperated by files
const userSchema = new mongo.Schema ({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      
    },
    gender:{
      type:String,
      required:true,
    },
    job_title:{
      type:String,
    },
    
});
const user=mongo.model("user",userSchema);
mongo
  .connect("mongodb://localhost:27017/test")//pass the url with the name of database
  .then(()=>console.log("connected"))
  .catch((err)=>console.log("error"))

app.get('/api/users',(req,res)=>{
    const html=`
    <ul>
    
    ${user.find`<li>${user.first_name}</li>` `<li>${user.email}</li>`}
    </ul>
    `;
    res.send(html);
})
app.get('/api/users/:id',(req,res)=>{
    const userbyid=user.findById(req.params.id)
    return res.json(userbyid);
})
app.post('/api/users', async (req, res) => {
  const body = req.body;
  if (!body || !body.first_name || !body.email || !body.gender) {
    return res.status(400).json({ msg: "Required fields are missing in the request body" });
  }

  try {
    const result = await user.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });

    console.log(result);
    return res.status(201).json({ msg: "success" });
  } catch (error) {
    console.error("Error creating user", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});
app.patch('/api/users/:id/:FieldToChange/change', (req, res) => { 
    const id = Number(req.params.id);
    const fieldToChange = String(req.params.FieldToChange);
  
    // Find the user by ID
    const userIndex = users.findIndex((user) => user.id === id);
  
    // Update the user's specified field if found
    if (userIndex !== -1) {
      // Check if the specified field exists in the user object
      if (users[userIndex].hasOwnProperty(fieldToChange)) {
        // Update the specified field
        users[userIndex][fieldToChange] = req.body[fieldToChange];
         res.json({ message: `User's ${fieldToChange} updated successfully`, user: users[userIndex] });
      } else {
        res.status(400).json({ message: `User's ${fieldToChange} does not exist` });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
  app.delete('/api/users/:id/:FieldToDelete/delete', (req, res) => {
    const id = Number(req.params.id);
    const fieldToDelete = String(req.params.FieldToDelete);
  
    // Find the user by ID
    const userIndex = users.findIndex((user) => user.id === id);
  
    // Delete the specified field if found
    if (userIndex !== -1) {
      // Check if the specified field exists in the user object
      if (users[userIndex].hasOwnProperty(fieldToDelete)) {
        // Delete the specified field
        delete users[userIndex][fieldToDelete];
        res.json({ message: `User's ${fieldToDelete} deleted successfully`, user: users[userIndex] });
      } else {
        res.status(400).json({ message: `User's ${fieldToDelete} does not exist` });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
  
app.listen(PORT,()=>console.log('Server Started at port:${PORT}')); 


