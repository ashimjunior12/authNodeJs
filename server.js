const express = require('express')
const loginRoutes = require('./routes/routes')
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv')
const app = express();
const mongoose = require("mongoose")

dotenv.config();


mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => console.log('Connected to MongoDD'))
  .catch((err) => console.log(err));

  
app.use(express.json())
app.use('/auth/', loginRoutes)


app.listen(PORT, ()=>{
 console.log("Server running on port", PORT)
})