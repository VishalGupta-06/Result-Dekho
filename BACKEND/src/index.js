// import dotenv from "dotenv"
// dotenv.config({
//     path: './.env'
// })                                        //It is not working

import "dotenv/config";
import connectDB from "./db/index.js"
import { app } from "./app.js"

import "./config/passport.js"
// import pdfToExcel from "../admin/pdfToExcel&DB.js"
// import filterPdf from "../admin/filterPdf.js";
// import storeToDatabase from "../admin/exceltoDB.js"
// import filterData from "../admin/filterData.js";

connectDB()
.then( ()=>{
    app.listen(8000,() =>{
        console.log( " Server is connected on 8000 ")
        // pdfToExcel();
        // storeToDatabase();
        // filterData()
    })
})
.catch( (err) =>{
    console.log("MongoDB is connection is failed !!!" , err )
})