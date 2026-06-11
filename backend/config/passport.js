import { ExtractJwt, strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
import pool from "../db/db.js";

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const data = "SELECT * FROM users WHERE id = $1";
      const result = await pool.query(data, [payload.id]);
      const user = result.rows[0];

      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  }),
);
