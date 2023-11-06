import React from 'react';
import { Button } from '@mui/material';
import InputField from '../../../../components/InputField';
import { useForm } from 'react-hook-form';
import '../../styles/Login.css';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from "react-router-dom";

const OTPForm = ({ onSubmitForm, loading }) => {

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
    <div className='border-solid shadow-2xl h-fit w-96 text-center p-8 rounded-2xl py-28 flex items-center flex-col'>
        <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete='off'
        className='loginForm'
        noValidate
        >
            <div className='inputContainer'>
                <InputField
                    keyName="otp"
                    required={true}
                    label="OTP"
                    register={{...register("otp", {
                        required: "OTP is required"})}}
                    errors={errors}/>
            </div>
            <div className='buttonContainer'>
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    disabled={loading}
                    sx={{
                        height: "3rem",
                        mb: "1rem"
                    }}
                >Submit</Button>
            </div>
        </form>
        <DevTool control={control}/>
    </div>
    
  )
}

export default OTPForm