import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../model/user.model.js";

const googleLogin = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          if (!profile.emails[0].value.endsWith("@nitjsr.ac.in")) {
            return cb(
              new Error("Only NIT Jamshedpur emails are allowed"),
              null,
            );
          }
          let user = await User.findOne({
            registration: profile.emails[0].value.slice(0, 11),
          });

          if (!user) {
            await User.findOneAndUpdate(
              { registration },
              {
                $set: {
                  googleId: profile.id,
                },
              },
              {
                upsert: true,
                new: true,
              },
            );
          }

          return cb(null, user);
        } catch (error) {
          return cb(error, null);
        }
      },
    ),
  );
};

export { googleLogin };
