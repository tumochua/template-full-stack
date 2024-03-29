
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
import style from './Login.module.scss';

///config router
import config from '@/config';

/// redux
// import { createUser } from '@/store/actions/userActions';

function Login() {
    // const [stateAccessToken, setAccessToken] = useState(null);
    // const [stateRefreshToken, setRefreshToken] = useState(null);
    // const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(4).max(20).required(),

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
                        <h1>Login An Account</h1>
                        <p>
                            Login an account to enjoy all the services <br /> without any ads for free!
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
                        <input type="submit" value="Login" className={style.submitBtn} />
                        <div className='flex justify-center mt-5 text-blue-500'>
                            <Link to={config.routes.forgetPassword}>
                                Forget Password
                            </Link>
                        </div>
                    </form>
                    <div className='flex items-center mt-16'>
                        <div className='h-1 w-full bg-gray-300 flex-1'></div>
                        <span className='text-gray-400 px-4 uppercase'>Orther</span>
                        <div className='h-1 w-full bg-gray-300 flex-1'></div>
                    </div>
                    <div className='flex justify-evenly'>
                        <button className={style.auth}>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png' />
                            <span>Facebook</span>
                        </button>
                        <button className={style.auth}>
                            <img src='https://i.pinimg.com/originals/74/65/f3/7465f30319191e2729668875e7a557f2.png' />
                            <span>Google</span>
                        </button>
                    </div>
                    <div className={style.footerWapper}>
                        <p>
                            Already Have An Account?{' '}
                            <Link to={config.routes.register} className={style.navLink}>
                                Register
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

export default Login
