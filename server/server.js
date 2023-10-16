const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
require("dotenv").config();
app.use(express.json());

const dbConfig = require("./config/dbConfig")

const userRoute = require('./routes/usersRoute')
const inventoryRoute = require("./routes/inventoryRoute");
const dashboardRoute = require("./routes/dashboardRoute");

app.use('/api/users', userRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/dashboard", dashboardRoute);


app.listen(port, () => console.log(`Server Started at ${port}`));