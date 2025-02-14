const mongoose = require("mongoose");
const db_pass = process.env.DB_PASS;
// console.log(db_pass);
const DB = `mongodb+srv://solarshiv9:${db_pass}@cluster0.9jxao.mongodb.net/HRM?retryWrites=true&w=majority&appName=Cluster0`;
const connectDB = async()=> {
    // await mongoose.connect(DB, {
    //     useNewUrlParser: true,
    // })
    // .then(() => console.log("Connection to MongoDB"))
    // .catch((error) => console.log(error.message));
    try {
        const connectionInstance = await mongoose.connect(DB, {
                useNewUrlParser: true,
            });
        console.log(`\n MongoDB connected !! DB HOST:`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
} 

module.exports={connectDB};