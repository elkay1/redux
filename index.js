const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");

require("./services/passport");
const keys = require("./config/keys");

mongoose.connect(keys.mongooseUri);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

app.listen(PORT, function() {
  console.log("Your server is open on port " + PORT);
});
