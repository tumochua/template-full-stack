import express from "express";
import passport from "passport";
import {
  useCheckErrorToken,
  createOtp,
  createOtpByEmail
} from "../middleware/index";

import { useAccessToken, useRefreshToken } from '../jwt/useJwt'


import {
  // handleGetAllUser, handleLoginUser, handleRegisterUser,
  // handleGetProfileUser, handleCreateNotication, handleCreateShift,
  // handleDeleteUser,
  getLoginPageServer,
  getRegisterPageServer,
  postRegisterPageServer,
  postLoginPageServer,
  getPageVerifyOtpEmail,
  postPageVerifyOtpEmail,
  postPageRestOtpEmail,
  getHomePage,
  getFogetPassword,
  postFogetPassword,
  getSendOtp,
  refreshOtpEmail,
  postSendOtpEmail,
  getPageAdmin
} from '../controllers'
// import { sendOTPEmail } from '../use/Nodemailer'

///// router
let router = express.Router();

let initWebRoutes = (app) => {

  router.get('/', getHomePage)

  router.get('/register-server', getRegisterPageServer)
  router.post('/register-server', postRegisterPageServer)

  router.get('/login-server', getLoginPageServer)
  router.post('/login-server', postLoginPageServer)

  router.get('/verify-otp-email-server', getPageVerifyOtpEmail)
  router.post('/verify-otp-email-server', postPageVerifyOtpEmail)
  router.post('/rest-otp-email-server', postPageRestOtpEmail)


  router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

  router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
      // console.log('router');
      req.user = profile
      next()
    })(req, res, next)
  }, async (req, res) => {
    // console.log('user', req.user);
    const userId = req?.user?.response[0]?.id
    // console.log(userId);
    if (userId) {
      const accessToken = await useAccessToken(userId);
      const refreshToken = await useRefreshToken(userId);
      res.cookie("accessToken", accessToken, {
        // httpOnly: true,
        // secure: true,
      });
      res.cookie("refreshToken", refreshToken, {
        // httpOnly: true,
        // secure: true,
      });
    }
    res.redirect(`http://localhost:8000/`)
  })

  router.get('/auth/facebook',
    // passport.authenticate('facebook', { session: false, scope: ['email'] }));
    passport.authenticate('facebook', { authType: "reauthenticate", session: false, scope: ['email'] }));

  router.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', (err, profile) => {
      req.user = profile
      next()
    })(req, res, next)
  }, async (req, res) => {
    // console.log(req?.user?.response?.id);
    const userId = req?.user?.response?.id
    // console.log('user', req.user);
    // const userId = req?.user?.response[0]?.id
    // // console.log(userId);
    if (userId) {
      const accessToken = await useAccessToken(userId);
      const refreshToken = await useRefreshToken(userId);
      res.cookie("accessToken", accessToken, {
        // httpOnly: true,
        // secure: true,
      });
      res.cookie("refreshToken", refreshToken, {
        // httpOnly: true,
        // secure: true,
      });
    }
    res.redirect(`http://localhost:8000/`)
  })
  // router.get(
  //   "/facebook/callback",
  //   passport.authenticate("facebook", {
  //     successRedirect: "/dashboard",
  //     failureRedirect: "/login",
  //   })
  // );

  router.get('/send-otp', useCheckErrorToken, getSendOtp)
  router.post('/refresh-otp-email-server', useCheckErrorToken, refreshOtpEmail)
  // router.post('/send-otp-email-server', useCheckErrorToken, postSendOtpEmail)

  router.get('/forget-password', useCheckErrorToken, getFogetPassword)
  router.post('/forget-password', useCheckErrorToken, postFogetPassword)

  router.get('/admin', useCheckErrorToken, getPageAdmin)

  // router.post('/refresh-otp-email-server',)

  // /// auth
  // router.post("/api-register-user", handleRegisterUser);
  // router.post("/api-login", handleLoginUser);

  // /// profile
  // router.get(
  //   "/api-get-user-by-id",
  //   useCheckErrorToken,
  //   handleGetProfileUser
  // );

  // router.get(
  //   "/api-get-all-users",
  //   useCheckErrorToken,
  //   // useCheckRoles,
  //   handleGetAllUser
  // );

  // router.post('/api-crate-notification', useCheckErrorToken, handleCreateNotication)

  // router.post('/api-create-shifts', useCheckErrorToken, handleCreateShift)

  // router.delete('/api-delete-user', useCheckErrorToken, handleDeleteUser)

  return app.use("/", router);
};

module.exports = initWebRoutes;
