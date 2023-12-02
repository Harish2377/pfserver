// Loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./db/connection')




//Creates an Express application
const pfserver = express()

pfserver.use(cors())
pfserver.use(express.json())
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))

const PORT =  4000 || process.env.PORT

pfserver.listen(PORT,()=>{
    console.log(`project fair server started at port: ${PORT} and waiting for client request`);
})


pfserver.get('/',(req,res)=>{

    res.send(`<h1>project fair server started and waiting for client request...</h1>`)

})

