import React from 'react';
import ButtonCommon from '../../../../components/ButtonCommon';
import InputField from '../../../../components/InputField';
import { useForm } from 'react-hook-form';
import '../../styles/Login.css';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from "react-router-dom";

const ForgotForm = ({ onSubmitForm }) => {
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
                    title={"username or email"}
                    keyName={"nameAndEmail"}
                    placeholder={"Enter your username/email"}
                    register={register("nameAndEmail", {
                        required: 'Please enter your username or email'
                    })}
                    errors={errors}
                />
            </div>
            <div className='buttonContainer'>
                <ButtonCommon
                    title="Search"
                    type="submit"
                    classButton='submitButton'
                    classText='submitText'
                    onClick={onSubmitForm}
                />
            </div>
        </form>
        <DevTool control={control}/>
    </div>
    
  )
}

export default ForgotForm