const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project-flight");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(port, _ => console.log(`App Server Listening on Port: ${port}`));
//fatal error
