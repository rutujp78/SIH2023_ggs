const express = require('express');
const http = require('http');
const schedule = require('node-schedule');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utils/connectDB.js');
const configRoutes = require('./routes/configRoutes.js');
const { updateNudges } = require('./controller/nudgeController.js');
const { socketServer, io } = require('./utils/socketServer.js');
dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Socket.IO
const server =  http.createServer(app);
socketServer(server);

configRoutes(app);

// Following function run every four hours HEHE BOI ;)
const updateNudgesJob = schedule.scheduleJob('0 */4 * * *', async () => {
    await updateNudges(io);
});

server.listen(PORT, () => {
    connectDB();
    console.log("App listening on http://localhost:5000/");
});