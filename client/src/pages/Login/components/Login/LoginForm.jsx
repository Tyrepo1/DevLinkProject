import { DevTool } from '@hookform/devtools';
import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import InputField from '../../../../components/InputField';
import '../../styles/Login.css';

const LoginForm = ({ onSubmitForm, onSignup }) => {
    const navigate = useNavigate();

    const {
        reset,
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({});

    const forgotPassword = () => {
        navigate("/forgot-password")
    }
      
  return (
    <div className='border-solid shadow-2xl h-fit w-fit text-center p-8 rounded-2xl py-28 flex items-center flex-col'>
        <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete='off'
        noValidate
        >
            
            <div>
                <InputField
                    keyName="name"
                    required={true}
                    label="Username"
                    register={{...register("name", {
                        required: "Username is required",
                        minLength: {
                            value: 8,
                            message: "Username needs to be 8 characters or longer"
                        }})}}
                    errors={errors}/>
                <InputField
                    keyName="password"
                    type='password'
                    required={true}
                    label="Password"
                    register={{...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password needs to be 8 characters or longer"
                        }})}}
                    errors={errors}/> 
            </div>
            <div className='my-8'>
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{
                        height: "3rem",
                        mb: "1rem"
                    }}
                >Sign In</Button>
                <Button
                    variant='outlined'
                    size='medium'
                    onClick={onSignup}
                    fullWidth
                    sx={{
                        height: "3rem"
                    }}
                >Sign Up</Button>
            </div>
        </form>
        <a className="hover:cursor-pointer" onClick={forgotPassword}>Forgot password?</a>
        <DevTool control={control}/>
    </div>
    
  )
}

export default LoginForm