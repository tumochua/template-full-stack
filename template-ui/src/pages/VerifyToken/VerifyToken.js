
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
import style from './VerifyToken.module.scss';

///config router
import config from '@/config';

/// redux
// import { createUser } from '@/store/actions/userActions';

function VerifyToken() {
    // const [stateAccessToken, setAccessToken] = useState(null);
    // const [stateRefreshToken, setRefreshToken] = useState(null);
    // const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        otp: yup
            .number()
            .typeError("Please enter a number") // Thông báo lỗi nếu giá trị không phải là số
            .required("Please enter a value"),

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
                        <h1>VerifyToken An Account</h1>
                        <p>
                            VerifyToken an account to enjoy all the services <br /> without any ads for free!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={style.formLogin}>
                        <div className={style.formGroup}>
                            <span>Email</span><br />
                            <input type="text" placeholder="Email..." {...register("email")} className={style.inputLogin} />
                            <p className={style.errorMessage}>{errors.email?.message}</p>
                        </div>
                        <div className={style.formGroup}>
                            <span>otp</span><br />
                            <input
                                type="number"
                                placeholder="otp..."
                                {...register("otp")}
                                className={style.inputLogin}
                            />
                            <p className={style.errorMessage}>{errors.otp?.message}</p>
                        </div>


                        <input type="submit" value="Register" className={style.submitBtn} />

                    </form>
                    <div className={style.footerWapper}>
                        <p>
                            Register Have An Account?{' '}
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

export default VerifyToken
