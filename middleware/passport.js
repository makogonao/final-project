

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('./../settings/db')
const config = require('./../config')

const options = {
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    secretOrKey: config.jwt
                }

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            try {
                db.query(`select id, email from users where email = '${payload.userId}'`, (err, rows, fields) => {
                    if (err) {
                        console.log(err)
                    } else {
                        const user = rows
                        if (user) {
                            done(null, user)
                        } else {
                            done(null, false)
                        }
                    }
                })
            } catch(e) {
                console.log(e)
            }
        })
    )

}

