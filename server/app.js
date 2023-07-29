require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoute");




// MIDDLEWARES ...
app.use(morgan("dev"));
// cors setup 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/",userRouter);

// ERROR HANDLER MIDDLEWARE 
app.use(errorHandler);

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    // eslint-disable-next-line no-undef
    console.log("connected on port ", process.env.PORT);
});