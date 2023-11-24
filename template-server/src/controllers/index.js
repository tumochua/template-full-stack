require("dotenv").config();
import {
    serviceRegisterPageServer,
    serviceVerifyOtpEmail,
    serviceResetOtpEmail,
    serviceLogin,
    serviceForgetPassword,
    serviceRefreshOtpEmail
} from '../services/index'
import { sendOTPEmail, generateOTP } from '../use/Nodemailer'


const getHomePage = async (req, res) => {
    try {
        res.render('home')
    } catch (error) {
        console.log(error);
    }

}
const getLoginPageServer = async (req, res) => {
    try {
        // const data = await handle();
        // const listUsers = await db.Users.findAll();
        // res.json(listUsers);
        res.render('login')
    } catch (error) {
        console.log(error);
    }
}
const postLoginPageServer = async (req, res) => {
    try {
        const userInfor = req.body;
        const data = await serviceLogin(userInfor);
        // console.log(data);
        if (data.accessToken && data.refreshToken) {
            res.cookie("accessToken", data.accessToken, {
                // httpOnly: true,
                // secure: true,
            });
            res.cookie("refreshToken", data.refreshToken, {
                // httpOnly: true,
                // secure: true,
            });
        }
        delete data.accessToken;
        delete data.refreshToken;

        res.render('login', { data })
    } catch (error) {
        console.log(error);
    }
}

const getRegisterPageServer = async (req, res) => {
    try {
        res.render('register')
    } catch (error) {
        console.log(error);
    }
}
const postRegisterPageServer = async (req, res) => {
    try {

        const { email, firstname, lastname } = req.body;

        const data = await serviceRegisterPageServer(req.body)
        // console.log(data);
        if (data.status === 300) {
            // return res.render('register', { emailError: data.message });
            return res.send(`${data.message} <a href="/register-server">Register</a>`);
        }
        if (data.statusCode === 2) {
            const otp = generateOTP()
            sendOTPEmail(email, firstname, lastname, otp)
            res.cookie('otpEmail', { otp: otp, email: email }, {
                maxAge: process.env.OTP_TIME * 1000
            })
            return res.redirect('/verify-otp-email-server')
            // return res.send(`${data.message} <a href="/login-server">Login</a>`);
        }

        return res.render('register');
        // if(data.status)
    } catch (error) {
        console.log(error);
    }
}

const getPageVerifyOtpEmail = (req, res) => {
    res.render('verify-otp-email-server')
}

const postPageVerifyOtpEmail = async (req, res) => {
    try {
        // console.log(req.body);
        const { otpemail } = req.body
        const getOtpEmail = req.cookies.otpEmail
        // const userId = req.userId
        // console.log('getOtpEmail', getOtpEmail);

        const resultOtpEmail = await serviceVerifyOtpEmail(otpemail, getOtpEmail)
        // console.log(resultOtpEmail);
        if (resultOtpEmail.statusCode === 2) {
            return res.redirect('/login-server')
        }
        res.render('verify-otp-email-server', { message: resultOtpEmail.message })

    } catch (error) {
        console.log(error);
    }

}

const postPageRestOtpEmail = async (req, res) => {
    try {
        const dataEmail = req.body?.restotpemail;
        const resultEmail = await serviceResetOtpEmail(dataEmail)
        // console.log(resultEmail);
        const otp = generateOTP()
        sendOTPEmail(resultEmail.data?.email, resultEmail.data?.firstName, resultEmail.data?.lastName, otp)
        if (resultEmail.statusCode === 2) {
            res.cookie('otpEmail', { otp: otp, email: dataEmail }, {
                maxAge: process.env.OTP_TIME * 1000
            })
            res.render('verify-otp-email-server')
        }
    } catch (error) {
        console.log(error);
    }

}


const getSendOtp = async (req, res) => {
    try {
        res.render('send-otp')
    } catch (error) {
        console.log(error);
    }
}

const refreshOtpEmail = async (req, res) => {
    try {
        let result = null;
        result = await serviceRefreshOtpEmail(req.body)
        // console.log(result, req.body);
        if (result.statusCode === 2) {
            const otp = generateOTP()
            sendOTPEmail(result?.data?.email, result?.data?.firstname, result?.data?.lastname, otp)
            res.cookie('otpEmail', otp, {
                maxAge: process.env.OTP_TIME * 1000
            })

            // const getOtpEmail = req.cookies.otpEmail
            // console.log(getOtpEmail);
            // return res.redirect('/login-server')
        }
        res.render('send-otp', { result })
    } catch (error) {
        console.log(error);
    }
}
// const postSendOtpEmail = async (req, res) => {
//     try {
//         // console.log(req.body);
//         res.render('send-otp')
//     } catch (error) {
//         console.log(error);
//     }
// }

const getFogetPassword = async (req, res) => {
    try {
        res.render('forget-password')
    } catch (error) {
        console.log(error);
    }
}
const postFogetPassword = async (req, res) => {
    try {
        const userId = req.userId
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        const forgetPassworData = await serviceForgetPassword(userId, oldPassword, newPassword)
        // console.log(forgetPassworData);
        if (forgetPassworData.statusCode === 2) {
            return res.redirect('/login-server')
        }
        // res.send('Mật khẩu đã được đặt lại thành công!');
        res.render('forget-password', { forgetPassworData })
    } catch (error) {
        console.log(error);
    }

}

const getPageAdmin = (req, res) => {
    console.log('userId', req.userId);
    res.render('admin')
}

// const handleGetAllUser = async (req, res) => {
//     try {
//         const data = await handleServiceGetAllUser();
//         console.log("data", data);
//         return res.status(200).json(data);
//     } catch (error) {
//         console.log(error);
//         return res.status(200).json(error.message);
//     }
// };

// const handleRegisterUser = async (req, res) => {
//     try {
//         const data = await handleRegisterUserService(req.body);
//         return res.status(200).json(data);
//     } catch (error) {
//         console.log(error);
//     }
// };

// const handleLoginUser = async (req, res) => {
//     try {
//         const userInfor = req.body;
//         const data = await handleServiceLoginUser(userInfor);

//         if (data.accessToken && data.refreshToken) {
//             res.cookie("accessToken", data.accessToken, {
//                 // httpOnly: true,
//                 // secure: true,
//             });
//             res.cookie("refreshToken", data.refreshToken, {
//                 // httpOnly: true,
//                 // secure: true,
//             });
//         }
//         delete data.accessToken;
//         delete data.refreshToken;

//         return res.status(200).json(data);
//     } catch (error) {
//         console.log(error);
//         return res.status(200).json(error.message);
//     }
// }


// const handleGetProfileUser = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const data = await handleServiceGetProfileUser(userId);
//         return res.status(200).json(data);
//     } catch (error) {
//         console.log(error);
//         return res.status(200).json(error.message);
//     }
// }

// const handleCreateNotication = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const dataShift = req.body;
//         const data = await handleServiceCreateNotication(userId, dataShift);
//         return res.status(200).json(data);
//     } catch (error) {
//         console.log(error);
//         return res.status(200).json(error.message);
//     }
// }

// const handleCreateShift = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const notificationData = req.body;
//         const data = await handleServiceCreateShift(userId, notificationData);
//         return res.status(200).json(data);
//     } catch (error) {
//         console.log(error);
//         return res.status(200).json(error.message);
//     }
// }


// const handleDeleteUser = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const deleteUserId = req.body;
//         const data = await handleServiceDeleteUser(userId, deleteUserId);
//         return res.status(200).json(data);
//     } catch (error) {
//         console.log(error);
//         return res.status(200).json(error.message);
//     }
// }

module.exports = {
    getHomePage,
    getLoginPageServer,
    getRegisterPageServer,
    postLoginPageServer,
    postRegisterPageServer,
    getPageVerifyOtpEmail,
    postPageVerifyOtpEmail,
    postPageRestOtpEmail,
    getFogetPassword,
    postFogetPassword,
    getSendOtp,
    refreshOtpEmail,
    getPageAdmin
    // postSendOtpEmail,
}