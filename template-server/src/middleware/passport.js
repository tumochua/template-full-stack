require("dotenv").config();
import db from "../models";
import { v4 as uuidv4 } from 'uuid';

import passport from "passport";
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID_GOOGLE,
    clientSecret: process.env.CLIENTSECET_GOOGLE,
    callbackURL: "http://localhost:8000/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        // console.log('passport');
        // console.log('google 13:', profile);
        try {
            let response = null
            if (profile?.id) {
                response = await db.Users.findOrCreate({
                    where: {
                        // userIdAuth: profile.id,
                        email: profile?.emails[0]?.value
                    },
                    defaults: {
                        id: uuidv4(),
                        userIdAuth: profile?.id,
                        email: profile?.emails[0]?.value,
                        firstName: profile?.name?.familyName,
                        lastName: profile?.name?.givenName,
                        isActive: true,
                        typeLogin: profile?.provider,
                    }
                })
                // console.log('response', response);
            }
            return cb(null, { profile: profile, response: response });
        } catch (error) {
            console.log(error);
        }
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENTID_FACEBOOK,
    clientSecret: process.env.CLIENTSECET_FACEBOOK,
    callbackURL: "http://localhost:8000/facebook/callback",
    profileFields: ['email', 'photos', 'id', 'displayName'],
    enableProof: true,
},
    async function (accessToken, refreshToken, profile, cb) {
        // console.log('faceboook', profile);
        try {
            let response = null
            if (profile?.id) {
                response = await db.Users.findOrCreate({
                    where: {
                        // userIdAuth: profile.id,
                        email: profile?.emails[0]?.value
                    },
                    defaults: {
                        id: uuidv4(),
                        userIdAuth: profile?.id,
                        email: profile?.emails[0]?.value,
                        fullName: profile?.displayName,
                        isActive: true,
                        typeLogin: profile?.provider,
                    },
                    // raw: false,
                    // nest: true,
                })
                // console.log('response', response[0]?.dataValues ? response[0]?.dataValues : response[0]);
            }
            return cb(null, { profile: profile, response: response[0]?.dataValues ? response[0]?.dataValues : response[0] });

        } catch (error) {
            console.log(error)
        }
        // console.log(profile);
    }
));




// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// require('dotenv').config()
// const passport = require('passport')
// const db = require('./src/models')
// const { v4: uuidv4 } = require('uuid');

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/api/auth/google/callback"
// },
//     async function (accessToken, refreshToken, profile, cb) {
//         // them user vaof dbsds
//         const tokenLogin = uuidv4()
//         profile.tokenLogin = tokenLogin
//         try {
//             if (profile?.id) {
//                 let response = await db.User.findOrCreate({
//                     where: { id: profile.id },
//                     defaults: {
//                         id: profile.id,
//                         email: profile.emails[0]?.value,
//                         typeLogin: profile?.provider,
//                         name: profile?.displayName,
//                         avatarUrl: profile?.photos[0]?.value,
//                         tokenLogin
//                     }
//                 })
//                 if (!response[1]) {
//                     await db.User.update({
//                         tokenLogin
//                     }, {
//                         where: { id: profile.id }
//                     })
//                 }
//             }
//         } catch (error) {
//             console.log(error)
//         }
//         // console.log(profile);
//         return cb(null, profile);

//     }
// ));
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "/api/auth/facebook/callback",
//     profileFields: ['email', 'photos', 'id', 'displayName']

// },
//     async function (accessToken, refreshToken, profile, cb) {
//         const tokenLogin = uuidv4()
//         profile.tokenLogin = tokenLogin
//         try {
//             if (profile?.id) {
//                 let response = await db.User.findOrCreate({
//                     where: { id: profile.id },
//                     defaults: {
//                         id: profile.id,
//                         email: profile.emails[0]?.value,
//                         typeLogin: profile?.provider,
//                         name: profile?.displayName,
//                         avatarUrl: profile?.photos[0]?.value,
//                         tokenLogin
//                     }
//                 })
//                 if (!response[1]) {
//                     await db.User.update({
//                         tokenLogin
//                     }, {
//                         where: { id: profile.id }
//                     })
//                 }
//             }
//         } catch (error) {
//             console.log(error)
//         }
//         // console.log(profile);
//         return cb(null, profile);
//     }
// ));