import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import passport from 'passport';
import { config } from '../config/config';
import User from '../models/users';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.server.apiSecret,
};

export default passport.use(
  new JwtStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload._id)
      .then((user) => {
        return user ? done(null, user) : done(null, false);
      })
      .catch((err) => done(err, false));
  }),
);
