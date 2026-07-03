import mongoose, { connect } from "mongoose";

const connectDB = async () => {

    // console.log(process.env.DB_URI)
    // console.log(process.env.DB_NAME)


    try {
        const connected = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)

        console.log(`\n MongoDB connected !! DB HOST : ${connected.connection.host}`)


    } catch (error) {
        console.log(" dataBase is not CONNECTED ", error)
        process.exit(1)
    }
}

export default connectDB