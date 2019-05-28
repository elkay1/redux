const express = require("express");
const mongoose = require("mongoose");
require("./models/User");

require("./services/passport");
const keys = require("./config/keys");

mongoose.connect(keys.mongooseUri);

const PORT = process.env.PORT || 3000;

const app = express();

require("./routes/authRoutes")(app);

app.listen(PORT, function() {
  console.log("Your server is open on port " + PORT);
});
