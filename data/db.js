const mongoose=require("mongoose");

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Atlas connected");
    }catch(err){
        console.error("MongoDB Atlas connection failed:",err.message);
        console.log("Trying local MongoDB...");
        try {
            await mongoose.connect('mongodb://localhost:27017/ecommerce');
            console.log("Local MongoDB connected");
        } catch (localErr) {
            console.error("Local MongoDB also failed:", localErr.message);
            console.log("Please either:");
            console.log("1. Whitelist your IP in MongoDB Atlas");
            console.log("2. Install and run MongoDB locally");
            process.exit(1);
        }
    }
}

module.exports=connectDB;