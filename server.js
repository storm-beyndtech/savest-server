const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);

const cors = require('cors');
require('dotenv').config();


// checking for required ENV
if (!process.env.JWT_PRIVATE_KEY) {
  console.log("Fatal Error: jwtPrivateKey is required");
  process.exit(1);
}


// connecting to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((e) => console.log("Error connecting to MongoDB"));


// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/users", require('./routes/users'));
app.use("/api/transactions", require('./routes/transactions'));
app.use("/api/deposits", require('./routes/deposits'));
app.use("/api/withdrawals", require('./routes/withdrawals'));
app.use("/api/trades", require('./routes/trades'));
app.use("/api/utils", require("./routes/utils"));
app.use("/api/kycs", require("./routes/kycs"));
app.use("/api/trackings", require("./routes/shipment"));

// listening to port
const PORT = !process.env.PORT ? 5000 : process.env.PORT;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


app.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*").send('Yooo! API 💨💨💨 ');
});

