import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { config } from '../config/config';
import { Request } from 'express';
import { IJwtPayload } from '../utils/jwt';

const cookieExtractor = (req: Request) => {
  if (req && req.cookies) {
    return req.cookies[config.server.cookieName];
  }

  throw new Error('Unable to access cookies');
};

const options: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  ignoreExpiration: false,
  secretOrKey: config.server.apiSecret,
};

export default () =>
  passport.use(
    new JwtStrategy(options, (jwtPayload: IJwtPayload, done) => {
      done(null, jwtPayload, 'JWT_AUTHENTICATED');
    }),
  );
