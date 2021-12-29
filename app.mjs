import express from "express";
import mongoose from "mongoose";

// we imported express and set up a new express 
// instance const app = express().
const app = express();
app.use(express.json());
const port = 5000;
const dbUrl = "mongodb+srv://mrbaig:mrbaig97@cluster0.d2lgf.mongodb.net/myCRUD?retryWrites=true&w=majority"
mongoose.connect(dbUrl);
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
});
app.get("/", (request, response) => {
    response.send("welcome to the main get request gregrg")
})

app.get("/about", (request, response) => {
    response.send("this is a get request to send the response only")
})

// app.post("/about", (request, response) => {
//     response.send("this is a post request to store the data to db and send response back")

// })
app.post("/register", (req, res) => {
    if (!req.body.email ||
        !req.body.password ||
        !req.body.name
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } else {

        console.log(req.body)

        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        newUser.save(() => {
            console.log("data saved")
            res.send('profile created')
        })
    }
})

app.put("/about", (request, response) => {
    response.send("this is a put request to update any data")
})

app.delete("/about", (request, response) => {
    response.send("this is a delete request to delete any data")
})

mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (error) => console.log(`mongoose error ${error.message}`));


app.listen(port, () => console.log(`Your server is running on localhost:${port}`));