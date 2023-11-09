import { DevTool } from '@hookform/devtools';
import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import InputField from '../../../../components/InputField';
import '../../styles/Login.css';

const LoginForm = ({ onSubmitForm, onSignup, loading }) => {
    const navigate = useNavigate();

    const inputFields = [
        {
          keyName: 'name',
          type: 'text',
          label: 'Username',
          validation: {
            required: 'Username is required',
            minLength: {
              value: 8,
              message: 'Username needs to be 8 characters or longer',
            },
          },
        },
        {
          keyName: 'password',
          type: 'password',
          label: 'Password',
          validation: {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password needs to be 8 characters or longer',
            },
          },
        },
      ];
      

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
    const guestLogin = () => {
        navigate("/home")
    }
      
  return (
    <div className='border-solid shadow-2xl h-fit w-fit text-center p-8 rounded-2xl py-28 flex items-center flex-col bg-white'>
        <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete='off'
        noValidate
        >
            
            <div>
                {inputFields.map((field) => (
                    <InputField
                    key={field.keyName}
                    keyName={field.keyName}
                    type={field.type}
                    required={true}
                    label={field.label}
                    register={{ ...register(field.keyName, field.validation) }}
                    errors={errors}
                    />
                ))}
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
                    disabled={loading}
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
        <br></br>
        <a className="hover:cursor-pointer" onClick={guestLogin}>Continue as a guest</a>
        <DevTool control={control}/>
    </div>
    
  )
}

export default LoginForm