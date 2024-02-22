import React, { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { postRegister } from "../reducers/authReducer";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

function Login () {

    const { register, handleSubmit, setError, formState: { errors, isValid} } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmpass: ''
        },
        mode: 'onChange'
    })

    const [captchaCompleted, setCaptchaCompleted] = useState(false)
    const [captchaError, setCaptchaError] = useState(false)
    const navigate = useNavigate();

    const isAuth = useSelector((state) => state.auth.isAuth)
    const dispatch = useDispatch()

    function onChange() {
        setCaptchaCompleted(!captchaCompleted) 
        setCaptchaError(false) 
    }

    const onSubmit = async (values) => {
        try {
            await dispatch(postRegister(values));
            navigate('/sign-in');
        } catch (error) {

        }
    }

    if(isAuth) {
        return <Navigate to='/'/>
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <header className="auth-container-header">
                    <p>Create your account</p>
                </header>
                <form className="auth-container-main" onSubmit={handleSubmit(onSubmit)}>
                    <div className="auth-container-main-username">
                        <TextField
                            label="Your Username"
                            error={Boolean(errors.username?.message)}
                            helperText={errors.username?.message}
                            {...register('username', { required: 'Enter Username' })}
                            fullWidth
                            autoComplete="off"
                        />
                    </div>
                    <div className="auth-container-main-email">
                        <TextField
                            label="Email Address"
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            {...register('email', { required: 'Enter Email' })}
                            fullWidth
                            autoComplete="off"
                        />
                    </div>
                    <div className="auth-container-main-password">
                        <TextField
                            label="Password"
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            {...register('password', { required: 'Enter Password' })}
                            fullWidth
                            autoComplete="off"
                        />
                    </div>
                    <div className="auth-container-main-confirmpass">
                        <TextField
                            label="Password"
                            error={Boolean(errors.confirmpass?.message)}
                            helperText={errors.confirmpass?.message}
                            {...register('confirmpass', { required: 'Confirm Password' })}
                            fullWidth
                            autoComplete="off"
                        />
                    </div>
                    <div className={`auth-container-main-captcha`}>
                        <div className="auth-container-main-captcha-wrap">
                            <ReCAPTCHA sitekey="6LdRol0pAAAAAHLNBur_z0JcBxfgnP3w8tXcTszd" onChange={onChange} />
                        </div>
                    </div>
                    <div className="auth-container-main-sign-up">
                            <Button type="submit" fullWidth>
                                Sign up
                            </Button>
                        </div>
                </form>
                <div className="auth-container-sign-in">
                    <p>Already have an account?</p>
                    <NavLink to="/sign-in" className="no-style-link">
                        Sign in
                    </NavLink>
                </div>
            </div>

        </div>
    )
}

export default Login