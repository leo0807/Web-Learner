// import
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessage.js';
import Pusher from 'pusher';
import cors from 'cors';
// app config
const app = express();
const port = process.env.PORT || 9000;
const db = mongoose.connection;
const pusher = new Pusher({
    appId: "1145633",
    key: "c33bae7d39a0267e154f",
    secret: "586b88bc3e0efab4fb9a",
    cluster: "us2",
    useTLS: true
});
//  middleware
app.use(express.json());
app.use(cors());
// DB config
const connectURL = 'mongodb+srv://junxu:Aa416260!@cluster0.yotl8.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connectURL, {
    useCreateIndex: true,
    useNewUrlParser: true, //Parse URL
    useUnifiedTopology: true
});
//?

db.once("open", () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("A change occured", change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("message", "inserted", { // 监听管道 事件
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error triggering Pusher");
        }
    });
});



// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// })


// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});
// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));