import React from 'react';
import ButtonCommon from '../../../../components/ButtonCommon';
import InputField from '../../../../components/InputField';
import { useForm } from 'react-hook-form';
import '../../styles/Login.css';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onSubmitForm, onSignup }) => {
    const navigate = useNavigate();

    const {
        reset,
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({});
    const resetForm = () => {
        reset();
        onSubmitForm({});
    };

    const forgotPassword = () => {
        navigate("/forgot-password")
    }
      
  return (
    <div className='loginContainer'>
        <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete='off'
        className='loginForm'
        noValidate
        >
            <ButtonCommon
                    title="SignUp"
                    type="button"
                    classButton='signupButton'
                    classText='signupText'
                    onClick={onSignup}
                />
            <div className='inputContainer'>
                <InputField
                    title={"username"}
                    keyName={"name"}
                    placeholder={"Enter your username"}
                    register={register("name", {
                        required: 'Please enter your username'
                    })}
                    errors={errors}
                />
                <InputField
                    title={"password"}
                    keyName={"password"}
                    placeholder={"Enter your password"}
                    type={"password"}
                    register={register("password", {
                        required: 'Please enter your password'
                    })}
                    errors={errors}
                />
                <InputField
                    title={"otp"}
                    keyName={"otp"}
                    placeholder={"Enter your OTP"}
                    register={register("otp", {
                        required: 'Please enter your otp'
                    })}
                    errors={errors}
                />
            </div>
            <div className='buttonContainer'>
                <ButtonCommon
                    title="Login"
                    type="submit"
                    classButton='submitButton'
                    classText='submitText'
                    onClick={onSubmitForm}
                />
            </div>
        </form>
        <a className="forgotPassword" onClick={forgotPassword}>Forgot password?</a>
        <DevTool control={control}/>
    </div>
    
  )
}

export default LoginForm