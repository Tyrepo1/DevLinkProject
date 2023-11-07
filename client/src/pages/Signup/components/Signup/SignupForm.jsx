import { DevTool } from '@hookform/devtools';
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/InputField';

const SignupForm = ({ onSubmitForm, onSignup, loading }) => {

    const {
        reset,
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({});

    const inputFields = [
        {
          keyName: 'email',
          type: 'text',
          label: 'Email',
          validation: {
            required: 'Email is required',
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email format',
            },
          },
        },
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
      
  return (
    <div className='border-solid shadow-2xl h-fit w-fit text-center p-8 rounded-2xl py-28 flex items-center bg-white'>
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
                <FormGroup>
                    <FormControlLabel 
                        control={<Checkbox {...register("otp")} />} label="Enable 2FA?" />
                </FormGroup>
                
            </div>
            <div className='my-10'>
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{
                        height: "3rem",
                        mb: "1rem"
                    }}
                    disabled={loading}
                >Sign Up</Button>
                <Button
                    onClick={onSignup}
                    variant='outlined'
                    fullWidth
                    sx={{
                        height: "3rem",
                        mb: "2rem"
                    }}
                >Sign In</Button>
            </div>
        </form>
        <DevTool control={control}/>
    </div>
    
  )
}

export default SignupForm