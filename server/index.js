const main = require("./db");
const express = require("express");
const app = express();
const port = 5000;
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");
const cors = require("cors");
main().then(()=>{
    console.log("connected to db at index.js");
}).catch(e=>{
    console.log("error in connecting to db in index.js: ",e);
})

app.listen(port, ()=>{
    console.log("app is listening")
})
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);
