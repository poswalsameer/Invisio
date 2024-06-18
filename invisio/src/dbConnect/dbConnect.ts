import mongoose from "mongoose";


export const connect = () => {

    try {
        mongoose.connect(process.env.MONGO_URL!)
        console.log("DB connected");

        const connection = mongoose.connection;

        connection.on( 'connected', () => {
            console.log("MongoDB is connected");
        } )

        connection.on('error', (error) => {
            console.log("MongoDB connection error" + error);
            process.exit();
        })
        
    } catch (error) {
        console.log("Cannot connect to the DB");
        console.log(error);
        
    }

}
