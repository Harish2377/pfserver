const mongoose = require('mongoose');
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("mongodb atlas successfully connected with pfserver");
}).catch((err)=>{
    console.log(`Mongodb connection failed!! Error: ${err}`);
})