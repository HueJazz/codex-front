import React from "react"
import ReCAPTCHA from "react-google-recaptcha";
import { NavLink, Navigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"; 
import { postLogin } from "../reducers/authReducer"

function Login () {

    const isAuth = useSelector((state) => state.auth.isAuth)
    const dispatch = useDispatch()

    const { register, handleSubmit, setError, formState: { errors, isValid} } = useForm({
        defaultValues: {
            email: 'test11@gmail.com',
            password: 'test11',
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(postLogin(values))
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    }

    if(isAuth) {
        return <Navigate to='/'/>
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <header className="auth-container-header">
                    <p>Welcome back</p>
                </header>
                <form className="auth-container-main" onSubmit={handleSubmit(onSubmit)}>
                        <div className="auth-container-main-email">
                            <TextField 
                                label="Email Address"
                                error={Boolean(errors.email?.message)}
                                helperText={errors.email?.message}
                                {...register('email', {required: 'Enter Email'})}
                                fullWidth
                                autoComplete="off"
                            />
                        </div>
                        <div className="auth-container-main-password">
                            <TextField 
                                label="Password"
                                error={Boolean(errors.password?.message)}
                                helperText={errors.password?.message}
                                {...register('password', {required: 'Enter Password'})}
                                fullWidth
                                autoComplete="off"
                            /> 
                        </div>
                        <div className="auth-container-main-captcha">
                            <div className="auth-container-main-captcha-wrap">
                                <ReCAPTCHA sitekey="6LdRol0pAAAAAHLNBur_z0JcBxfgnP3w8tXcTszd"/>
                            </div>
                        </div>
                        <div className="auth-container-main-recovery">
                            <p>Forgot Password?</p>
                        </div>
                        <div className="auth-container-main-sign-in">
                            <Button type="submit" fullWidth>
                                Sign in
                            </Button>
                        </div>
                </form>
                <div className="auth-container-sign-up">
                        <p>Don`t have an account?</p>
                        <NavLink to="/sign-up" className="no-style-link">
                            Sign up
                        </NavLink>
                    </div>
            </div>

        </div>
    )
}

export default Login