const mongoose = require("mongoose");


const connectDB = async () =>{
      try {
        const conn = await mongoose.connect(process.env.mongoURl)
        console.log("connected Succesfully🎉")
      } catch (error) {
        console.log(`Err at connecting mongodb ${error.message}`)
      }
};

module.exports = connectDB