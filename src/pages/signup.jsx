import logo from '../assets/icon-left-font-monochrome-black.svg'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import '../utils/style/signup.css'
import { useForm } from "react-hook-form";
import Input from '@mui/material/Input';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment } from '@mui/material'
import { Visibility } from '@mui/icons-material'


export default function Signup() {
    // const [signupData, setSignupData] = useState({
    //     "firstName": "",
    //     "lastName": "",
    //     "email": "",
    //     "password": "",
    //     "confirmPassword": ""
    // })

    // function handleChange(event) {
    //     setSignupData({ ...signupData, [event.target.name]: event.target.value })
    // }

    // function handleValidation() {
    //     const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    //     const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    // }
    
    // function handleSubmit(event) {
    //     event.preventDefault();

    //     const fetchOptions = {
    //         method: "POST",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(signupData)
    //     }

    //     fetch ("http://localhost:3000/api/auth/signup", fetchOptions)
    //     .then (res =>  {
    //         if(res.ok) {
    //             return res.json();
    //         }
    //         throw new Error("There's an error sending the data")
    //     })
    //     .then (data => {
    //         signinFirstTime()
    //     })
    //     .catch(err => console.log(err)); 
    // }

    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const onSubmit = data => {

        function signinFirstTime() {

            const signinOptions = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": data.email,
                    "password": data.password
                })
            }
    
            fetch("http://localhost:3000/api/auth/login", signinOptions)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("There's an error sending the data")
            })
                .then(data => {
                sessionStorage.setItem("token", JSON.stringify(data.token))
                sessionStorage.setItem("userId", JSON.stringify(data.userId))
                sessionStorage.setItem("isAdmin", JSON.stringify(data.isAdmin))
                document.location.href = './profile/edit';
            })
            .catch(err => console.log(err))
    }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }

        fetch ("http://localhost:3000/api/auth/signup", fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error("There's an error sending the data")
        })
        .then (data => {
            signinFirstTime()
        })
        .catch(err => console.log(err)); 
    console.log(data)
    };


    return (
        <>
            <header className="signup-header">
                <img src={logo} alt="groupomania"/>
                    <Link to="/signin">
                        <Button className="btn dark" name="Sign in" />
                    </Link>
            </header>
            <main className="signup-main">
                <div className="signup-form-container">
                    <h2>Sign up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            placeholder='First Name'
                            name='firstName'
                            // value={signupData.firstName}
                            // onChange={handleChange}
                            {...register('firstName', {
                                pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                                required: true
                            })}
                        />
                        {errors?.firstName?.type === 'required' && <small>This field is required</small>}
                        {errors?.firstName?.type === 'pattern' && <small>Only alphabetical characters are allowed</small>}
                        <input
                            placeholder='Last Name'
                            name='lastName'
                            // value={signupData.lastName}
                            // onChange={handleChange}
                            {...register('lastName', {
                                pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                                required: true
                            })}
                        />
                        {errors?.lastName?.type === 'required' && <small>This field is required</small>}
                        {errors?.lastName?.type === 'pattern' && <small>Only alphabetical characters are allowed</small>}
                        <input
                            placeholder='Email Address'
                            type='email'
                            name='email'
                            // value={signupData.email}
                            // onChange={handleChange}
                            {...register('email', {
                                required: true
                            })}
                        />
                        {errors?.email?.type === 'required' && <small>This field is required</small>}
                        {errors?.email?.type === 'pattern' && <small>Please verify your email address again</small>}
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            // value={signupData.password}
                            // onChange={handleChange}
                            {...register('password', {
                                required: "You must specify a password",
                                minLength: 8,
                                maxLength: 20,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.{2,}\d)[A-Za-z\d]{8,20}$/g,
                                })
                                }
                        />
                        {errors?.password?.type === 'minLength' && <small>Password must have at least 8 characters</small>}
                        {errors?.password?.type === 'maxLength' && <small>Password cannot have more than 20 characters</small>}
                        {errors?.password?.type === 'pattern' && <small>Password must contain at least 2 digits, 1 uppercase and 1 lowercase letter.</small>}
                        <input
                            type="password"
                            placeholder='Confirm password'
                            name='confirmPassword'
                            // value={signupData.confirmPassword}
                            // onChange={handleChange}
                            required
                            {...register('confirmPassword', {
                                required: true,
                                validate: value =>
                                {
                                    if (watch('password') !== value) {
                                    return 'Passwords do not match'
                                    }}
                            })
                            }
                        />
                        {errors?.confirmPassword && <small>Passwords do not match</small>}
                        <Button className="btn red" name="Sign up" type="submit" />
                        <p>Already have an account? <Link to="/signin" className='bold'>Sign in!</Link></p>
                    </form>
                </div>
            </main>
        </>
    )
}