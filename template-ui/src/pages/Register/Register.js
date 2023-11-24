
/// reactjs
// import { useState, useEffect } from 'react';
/// react-router-dom
import { Link } from 'react-router-dom';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// import Cookies from 'js-cookie';
/// redux
// import { connect } from 'react-redux';

///scss
import style from './Register.module.scss';

///config router
import config from '@/config';

/// redux
// import { createUser } from '@/store/actions/userActions';

function Register() {
    // const [stateAccessToken, setAccessToken] = useState(null);
    // const [stateRefreshToken, setRefreshToken] = useState(null);
    // const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup
            .string()
            .required("Please enter a password")
            .min(6, "Passwords must be at least 6 characters"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Confirmation password does not match") // so sánh với trường password
            .required("Please confirm your password"),

    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        if (data) {
            console.log(data);
            // try {
            //     const response = await createUser(data);
            //     console.log('response', response);
            //     if (response && response.data.statusCode === 2) {
            //         setAccessToken(Cookies.get('accessToken'));
            //         setRefreshToken(Cookies.get('refreshToken'));
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        }
    };


    // useEffect(() => {
    //     if (stateAccessToken && stateRefreshToken) {
    //         navigate(config.routes.profile);
    //     }
    // }, [navigate, stateAccessToken, stateRefreshToken]);

    return (
        <>
            <div className={style.loginWapper}>
                <div className={style.bodyWapper}>
                    <div className={style.headeWapper}>
                        <h1>Register An Account</h1>
                        <p>
                            Register an account to enjoy all the services <br /> without any ads for free!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={style.formLogin}>
                        <div className={style.formGroup}>
                            <span>Email</span><br />
                            <input type="text" placeholder="Email..." {...register("email")} className={style.inputLogin} />
                            <p className={style.errorMessage}>{errors.email?.message}</p>
                        </div>
                        <div className={style.formGroup}>
                            <span>Password</span><br />
                            <input
                                type="password"
                                placeholder="Password..."
                                {...register("password")}
                                className={style.inputLogin}
                            />
                            <p className={style.errorMessage}>{errors.password?.message}</p>
                        </div>
                        <div className={style.formGroup}>
                            <span>Confirm Password</span><br />
                            <input
                                type="password"
                                placeholder="Confirm Password..."
                                {...register("confirmPassword")}
                                className={style.inputLogin}
                            />
                            <p className={style.errorMessage}>{errors.confirmPassword?.message}</p>
                        </div>

                        <div className='flex justify-center mb-5 text-blue-500'>
                            <Link to={config.routes.verifyToken}>
                                Verify Token
                            </Link>
                        </div>

                        <input type="submit" value="Register" className={style.submitBtn} />

                    </form>
                    <div className={style.footerWapper}>
                        <p>
                            Login Have An Account?{' '}
                            <Link to={config.routes.login} className={style.navLink}>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
// const mapStateToProps = (state) => ({
//     userRedux: state.users.user,
// });
// export default connect(mapStateToProps, { createUser })(Login);

export default Register
