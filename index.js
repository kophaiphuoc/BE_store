const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan('common'));
app.set('view engine', 'jade');
const routerAccount = require('./routers/account_routers');
const webadmin=require('./routers/web_admin_api');
// connect to cloud mongoose
try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URL, () => {
      console.log("connect success to mongoose");
    });
  } catch (error) {
    console.log("connect error to mongoose");
  }

app.use("/v1",routerAccount)
app.use("/",webadmin)
// connect to sever
app.listen(process.env.PORT,()=>{
    console.log("listen on port " + process.env.PORT)
})