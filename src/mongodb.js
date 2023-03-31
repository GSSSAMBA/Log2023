const { default: mongoose } = require("mongoose");


// mongoose.connect("mongodb://localhost:27017/TestLogDB")
mongoose.connect("mongodb+srv://gssbartender:4srQy9lx6pOyzrry@cluster0.gwpfnxg.mongodb.net/?retryWrites=true&w=majority")


    .then(() => {
        console.log("mongo connected");
    })
    .catch(() => {
        console.log("failed to connect");
    })

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("Collection1", LogInSchema)

module.exports = collection

