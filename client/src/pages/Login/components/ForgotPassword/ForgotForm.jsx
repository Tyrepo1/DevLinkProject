import { DevTool } from '@hookform/devtools';
import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import InputField from '../../../../components/InputField';
import '../../styles/Login.css';

const ForgotForm = ({ onSubmitForm, loading }) => {
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
            <div className='border-solid shadow-2xl h-fit w-96 text-center p-8 rounded-2xl py-28 flex items-center flex-col'>
                <InputField
                    keyName="nameAndEmail"
                    required={true}
                    label="Username"
                    register={{...register("nameAndEmail", {
                        required: "Enter your username"})}}
                    errors={errors}/> 
                <Button
                    variant='contained'
                    type="submit"
                    disabled = {loading}
                    fullWidth
                    sx={{
                        height: "3rem",
                        mb: "1rem"
                    }}
                >Search</Button>
            </div>
            <div className='buttonContainer'>
                
            </div>
        </form>
        <DevTool control={control}/>
    </div>
    
  )
}

export default ForgotForm