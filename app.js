const express = require('express');
const app = express();
const connection = require('./config/database');


require('dotenv').config();


connection();

app.get('/',(req,res)=>{
    console.log(req.body)
})


app.use("/annonces", require("./routes/annonces"));



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

module.exports = app;
