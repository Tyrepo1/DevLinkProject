import React from 'react';
import ButtonCommon from '../ButtonCommon';
import InputField from '../InputField';
import { useForm } from 'react-hook-form';
import '../../styles/Login.css';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onSubmitForm }) => {
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
            <div className='inputContainer'>
                <InputField
                    title={"username"}
                    keyName={"name"}
                    placeholder={"Enter your username"}
                    register={register("name", {
                        required: 'Name is required'
                    })}
                    errors={errors}
                />
                <InputField
                    title={"password"}
                    keyName={"password"}
                    placeholder={"Enter your password"}
                    register={register("password", {
                        required: 'Password is required'
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