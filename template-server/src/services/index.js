const fs = require('fs');
import { v4 as uuidv4 } from 'uuid';

import db from "../models/index";
import {
    userCheckEmail,
    useHasPassword,
    useDecodePassword,

} from "../use/hooks";

import {
    useAccessToken,
    useRefreshToken,
} from "../jwt/useJwt";
import { sendOTPEmail, generateOTP } from '../use/Nodemailer'

// import {
//     useAccessToken,
//     useRefreshToken,
//     userVervifyRefreshToken,
// } from "../jwt/useJwt";


// const handleServiceGetAllUser = () => {
//     return new Promise(async (resolve, reject) => {
//         try {

//             const allUsers = await db.User.findAll({
//                 attributes: {
//                     exclude: ["password_hash", 'refresh_token'],
//                 },
//                 include: [
//                     {
//                         model: db.Role,
//                         as: "roleData",
//                         // attributes: [
//                         //     "id",
//                         //     "roleId",
//                         //     "role_name",
//                         // ],
//                     },
//                     {
//                         model: db.Timekeeping,
//                         as: "timekeepingData",
//                         // attributes: [
//                         //     "id",
//                         //     "userId",
//                         //     "hour_come",
//                         //     "return_time"
//                         // ],
//                     },
//                     {
//                         model: db.Salary,
//                         as: "salaryData",
//                         // attributes: [
//                         //     "id",
//                         //     "userId",
//                         //     "roleId",
//                         //     "basic_salary"
//                         // ],
//                     },
//                 ],
//                 raw: false,
//                 nest: true,
//             });
//             // console.log("allUsers", allUsers);
//             resolve({
//                 statusCode: 2,
//                 data: allUsers,
//             });
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// const handleRegisterUserService = (user) => {
//     return new Promise(async (resolve, reject) => {
//         const { email, password, firstName, lastName } = user;
//         try {
//             if (!email || !password || !firstName || !lastName) {
//                 resolve({
//                     status: 400,
//                     message: "you are missing a required parameter",
//                 });
//             }

//             const data = await userCheckEmail(email);
//             console.log('data', data);
//             const hashPassword = await useHasPassword(password);
//             if (!data) {
//                 await db.User.create({
//                     firstName: firstName,
//                     lastName: lastName,
//                     email: email,
//                     password_hash: hashPassword,
//                 });

//                 resolve({ statusCode: 2, message: "create user successful" });
//             } else {
//                 resolve({ statusCode: 4, message: `${data.email} Your have not` });
//             }
//         } catch (error) {
//             createError.InternalServerError();
//             reject(error);
//         }
//     });
// };

// const handleServiceLoginUser = (userInfor) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let data = await userCheckEmail(userInfor.email);
//             if (!data) {
//                 resolve({
//                     statusCode: 4,
//                     message: "Your login information is incorrect",
//                 });
//                 return;
//             }
//             if (data) {
//                 const passwordHash = data.password_hash;
//                 const userId = data.id;

//                 const password = await useDecodePassword(userInfor.password, passwordHash);
//                 if (password && data) {
//                     const accessToken = await useAccessToken(userId);
//                     const refreshToken = await useRefreshToken(userId);
//                     delete data.password_hash;

//                     resolve({
//                         statusCode: 2,
//                         user: data,
//                         accessToken: accessToken,
//                         refreshToken: refreshToken,
//                     });
//                 } else {
//                     resolve({
//                         statusCode: 4,
//                         message: "Your login information is incorrect",
//                     });
//                 }
//             } else {
//                 resolve({
//                     statusCode: 4,
//                     message: "Your login information is incorrect",
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             reject(error);
//         }
//     });
// }

// const handleServiceGetProfileUser = (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             /// findAll
//             const data = await db.User.findOne({
//                 where: {
//                     id: userId,
//                 },
//                 attributes: {
//                     exclude: ["password_hash", 'refresh_token'],
//                 },
//                 include: [
//                     {
//                         model: db.Role,
//                         as: "roleData",
//                         // attributes: [
//                         //     "id",
//                         //     "roleId",
//                         //     "role_name",
//                         // ],
//                     },
//                     {
//                         model: db.Timekeeping,
//                         as: "timekeepingData",
//                         // attributes: [
//                         //     "id",
//                         //     "userId",
//                         //     "hour_come",
//                         //     "return_time"
//                         // ],
//                     },
//                     {
//                         model: db.Salary,
//                         as: "salaryData",
//                         // attributes: [
//                         //     "id",
//                         //     "userId",
//                         //     "roleId",
//                         //     "basic_salary"
//                         // ],
//                     },
//                     {
//                         model: db.Shift,
//                         as: "shiftData",
//                     },
//                     // {
//                     //     model: db.Notification,
//                     //     as: "notificationData",
//                     // },
//                     // {
//                     //     model: db.Sales,
//                     //     as: "saleData",
//                     // },
//                 ],
//                 raw: false,
//                 nest: true,
//             });

//             resolve({
//                 statusCode: 2,
//                 data,
//             });
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// const handleServiceCreateNotication = (userId, notificationData) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             // console.log(userId || notificationData.title || notificationData.content);
//             if (!userId || !notificationData.title || !notificationData.content) {
//                 resolve({
//                     status: 400,
//                     message: "you are missing a required parameter",
//                 });
//             }
//             await db.Notification.create({
//                 userId: userId,
//                 title: notificationData.title,
//                 content: notificationData.content
//             })
//             resolve({ statusCode: 2, message: "create notification successful" });
//         } catch (error) {
//             reject(error);
//         }
//     });
// }


// const handleServiceCreateShift = (id, dataShift) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await db.Shift.create({
//                 userId: dataShift.userId,
//                 time: dataShift?.data?.shifts
//             })
//             resolve({ statusCode: 2, message: "create notification successful" });

//         } catch (error) {
//             reject(error);
//         }
//     });
// }


// const handleServiceDeleteUser = (userId, deleteUserId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             console.log(userId, deleteUserId);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

const serviceRegisterPageServer = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(userData);
            const { email, firstname, password, lastname } = userData
            if (!email || !password || !firstname || !lastname) {
                resolve({
                    status: 400,
                    message: "you are missing a required parameter",
                });
            }

            const emailData = await userCheckEmail(email);
            // console.log(emailData);
            if (emailData?.email === email) {
                resolve({
                    status: 300,
                    message: "Email already exists",
                });

            } else {
                // console.log(generateOTP());
                const hashPassword = await useHasPassword(password);
                await db.Users.create({
                    id: uuidv4(),
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    password: hashPassword,
                });
                resolve({ statusCode: 2, message: "create user successful", email: email });
            }
        } catch (error) {
            reject(error);
        }
    });
}

const serviceVerifyOtpEmail = (otpemail, getOtpEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('313', getOtpEmail);
            if (getOtpEmail.otp === undefined) {
                resolve({
                    statusCode: 3,
                    message: 'expired otp'
                })
            }
            if (otpemail !== getOtpEmail.otp) {
                resolve({
                    statusCode: 4,
                    message: 'fail otp'
                })
            }
            if (otpemail === getOtpEmail.otp) {
                await db.Users.update({
                    isActive: true
                }, {
                    where: { email: getOtpEmail.email }
                })
                resolve({
                    statusCode: 2,
                    message: 'otp successful'
                })
            }


        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

const serviceResetOtpEmail = (dataEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('dataEmail', dataEmail);
            if (dataEmail) {
                const email = await db.Users.findOne({
                    where: {
                        email: dataEmail
                    },
                    attributes: ['id', 'roleId', 'email', 'firstName', 'lastName'],
                })
                // const otp = generateOTP()
                // sendOTPEmail(email.email, email.firstName, email.lastName, otp)
                // res.cookie('otpEmail', otp, {
                //     maxAge: process.env.OTP_TIME * 1000
                // })
                resolve({
                    statusCode: 2,
                    data: email
                })
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}


const serviceLogin = (userInfor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await userCheckEmail(userInfor.email);
            // console.log(data);
            if (!data) {
                resolve({
                    statusCode: 4,
                    message: "Your login information is incorrect",
                });
                return;
            }
            if (data && data.isActive === 0) {
                resolve({
                    statusCode: 4,
                    message: "Your account is not activated",
                });
                return;
            }
            if (data) {
                const passwordHash = data.password;
                const userId = data.id;

                const password = await useDecodePassword(userInfor.password, passwordHash)
                // console.log('data', data, 'password', password);
                if (password && data) {
                    const accessToken = await useAccessToken(userId);
                    const refreshToken = await useRefreshToken(userId);
                    // console.log(data);
                    // await db.Users.update({
                    //     isLogin: true
                    // }, {
                    //     where: { email: userInfor.email }
                    // })
                    delete data.password;

                    resolve({
                        statusCode: 2,
                        user: data,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                } else {
                    resolve({
                        statusCode: 4,
                        message: "Your login information is incorrect",
                    });
                }
            } else {
                resolve({
                    statusCode: 4,
                    message: "Your login information is incorrect",
                });
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

const serviceForgetPassword = (userId, oldPassword, newPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(userId, oldPassword, newPassword);

            const userData = await db.Users.findOne({
                where: {
                    id: userId
                },
            })

            if (userData) {
                const password = await useDecodePassword(oldPassword, userData.password);
                // console.log(password);
                if (!password) {
                    resolve({
                        statusCode: 3,
                        message: "incorrect password",
                    });
                } else {
                    // console.log(userData);

                    // const otp = generateOTP()
                    // sendOTPEmail(userData.email, userData.firstname, userData.lastname, otp)
                    // res.cookie('otpEmail', otp, {
                    //     maxAge: process.env.OTP_TIME * 1000
                    // })
                    resolve({
                        statusCode: 2,
                        message: "successful password",
                    });
                }
            }

        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

const serviceRefreshOtpEmail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(data);
            const userData = await db.Users.findOne({
                where: {
                    email: data.refreshotp
                },
                attributes: ['email', 'firstName', 'lastName', 'roleId']
            })
            // console.log(userData);
            if (!userData) {
                resolve({
                    statusCode: 3,
                    message: 'not email'
                })
            }
            if (userData) {
                resolve({
                    statusCode: 2,
                    data: userData
                })
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}


module.exports = {
    serviceRegisterPageServer,
    serviceVerifyOtpEmail,
    serviceResetOtpEmail,
    serviceLogin,
    serviceForgetPassword,
    serviceRefreshOtpEmail
}