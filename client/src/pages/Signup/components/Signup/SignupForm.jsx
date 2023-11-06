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
      
  return (
    <div className='border-solid shadow-2xl h-fit w-fit text-center p-8 rounded-2xl py-28 flex items-center'>
        <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete='off'
        noValidate
        >
            <div>
                <InputField
                    keyName="email"
                    required={true}
                    label="Email"
                    register={{...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Invalid email format",
                        }})}}
                    errors={errors}/>
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