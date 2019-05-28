const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  keys = require("../config/keys"),
  mongoose = require("mongoose");

const User = mongoose.model("users");
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.Id }).then(existingUser => {
        if (existingUser) {
          // We already have this id in the database
          done(null, existingUser);
        } else {
          // We dont have this id in the database
          new User({
            googleId: profile.Id
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
