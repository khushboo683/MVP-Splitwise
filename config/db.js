import mongoose from 'mongoose';


export const connectDb = async()=>{
    try{
     await mongoose.connect('mongodb://root:example@localhost:27017',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
     })
     console.log('Mongodb connected');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}