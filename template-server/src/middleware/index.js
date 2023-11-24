require("dotenv").config();
import db from "../models/index";
import { sendOTPEmail, generateOTP } from '../use/Nodemailer'
import {
    useAccessToken,
    useVerifyAccessToken,
    userVervifyRefreshToken,
} from "../jwt/useJwt";
import { serviceRefreshOtpEmail } from '../services/index'

const useCheckErrorToken = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = req.cookies;
            // console.log(token);
            if (token?.accessToken && token?.refreshToken) {
                const accessToken = token?.accessToken;
                const refreshToken = token?.refreshToken;
                // console.log('accessToken', accessToken);
                // console.log('refreshToken', refreshToken);
                const data = await useVerifyAccessToken(accessToken);
                console.log('data', data);
                // if (Number.isInteger(data)) {
                //     req.userId = data;
                //     return next();
                // }
                // if (data) {
                //     req.userId = data;
                //     return next();
                // }
                if (data === "invalid token") {
                    res.json({
                        statusCode: 403,
                        message: "invalid token",
                    });
                }
                if (data === "jwt expired") {
                    // console.log('test');
                    const tokenRefreshToken = await userVervifyRefreshToken(refreshToken);
                    // console.log('tokenRefreshToken', tokenRefreshToken);
                    // console.log(tokenRefreshToken === "invalid token");
                    if (tokenRefreshToken === "invalid token") {
                        res.json({
                            statusCode: 403,
                            message: "invalid token",
                        });
                    }
                    const userId = tokenRefreshToken.userId;
                    const newAccessToken = await useAccessToken(userId);
                    res.cookie("accessToken", newAccessToken, {
                        // httpOnly: true,
                        // secure: true,
                    });
                    req.userId = userId;
                    return next();
                }
                // console.log('test1');
                req.userId = data;
                return next();
            } else {
                // console.log(token);
                res.json({
                    statusCode: 404,
                    message: "invalid token",
                });
                // next()
            }

        } catch (error) {
            console.log(error);
            res.json({
                statusCode: 500,
                message: "error from serve",
            });
        }
    });
};

const useCheckRoles = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const user = await db.User.findOne({
            //     where: {
            //         id: req.userId,
            //     },
            //     attributes: {
            //         exclude: ["password"],
            //     },
            //     include: [
            //         {
            //             model: db.AllCode,
            //             as: "genderData",
            //             attributes: ["id", "KeyMap", "valueEn", "valueVi"],
            //         },
            //         {
            //             model: db.AllCode,
            //             as: "roleData",
            //             attributes: ["id", "KeyMap", "valueEn", "valueVi"],
            //         },
            //     ],
            //     raw: true,
            //     nest: true,
            // });
            // if (user) {
            //     req.role = user.roleData;
            //     next();
            // }
        } catch (error) {
            console.log(error);
            res.json({
                statusCode: 500,
                message: "error from serve",
            });
        }
    });
};




const createOtp = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, firstname, lastname } = req.body;
            // console.log(email, firstname, password, lastname);
            const otp = generateOTP()
            sendOTPEmail(email, firstname, lastname, otp)
            res.cookie('otpEmail', otp, {
                maxAge: process.env.OTP_TIME * 1000
            })
            next();
        } catch (error) {
            reject(error);
        }
    });
}

const refreshOtpEmail = async (req, res, next) => {
    try {
        const data = await serviceRefreshOtpEmail(req.body)
        console.log(data);
        // if (data.statusCode === 2) {
        //     sendOTPEmail(data?.data?.email, data?.data?.firstname, data?.data?.lastname, otp)
        //     res.cookie('otpEmail', otp, {
        //         maxAge: process.env.OTP_TIME * 1000
        //     })
        // }
        // next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createOtp,
    useCheckErrorToken,
    useCheckRoles,
    // createOtpByEmail,
    refreshOtpEmail
};
