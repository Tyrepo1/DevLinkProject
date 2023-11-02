import React from 'react';
import ButtonCommon from '../../../../components/ButtonCommon';
import InputField from '../../../../components/InputField';
import { useForm } from 'react-hook-form';
import '../../styles/Login.css';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from "react-router-dom";

const OTPForm = ({ onSubmitForm }) => {
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
                    title={"OTP"}
                    keyName={"otp"}
                    placeholder={"Enter your OTP"}
                    register={register("otp", {
                        required: 'Please enter your OTP'
                    })}
                    errors={errors}
                />
            </div>
            <div className='buttonContainer'>
                <ButtonCommon
                    title="Submit"
                    type="submit"
                    classButton='submitButton'
                    classText='submitText'
                />
            </div>
        </form>
        <DevTool control={control}/>
    </div>
    
  )
}

export default OTPForm