import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connectMongoDb from './connection.js'
import router from './routes/user.js';


const app = express();
const PORT = 8000;
app.use(express.json());
app.use(morgan('dev'))

// Enable CORS for all routes
app.use(cors());

//routes
app.use('/api', router);

connectMongoDb("mongodb://127.0.0.1:27017/rlapp").then( () => {
    try {
        app.listen(PORT, () => {console.log("Server Started")})
    } catch (error) {
        console.log("Faild to start server")
    }
}).catch(error => {
    console.log("Faild to connect mongodb")
})