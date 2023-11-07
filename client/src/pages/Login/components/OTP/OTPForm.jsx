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

    const inputFields = [
        {
            keyName: 'otp',
            type: 'text',
            label: 'OTP',
            validation: {
              required: 'OTP is required',
            },
        },
      ];

      
  return (
    <div className='border-solid shadow-2xl h-fit w-96 bg-white text-center p-8 rounded-2xl py-28 flex items-center flex-col'>
        <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete='off'
        className='loginForm'
        noValidate
        >
            <div className='inputContainer'>
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