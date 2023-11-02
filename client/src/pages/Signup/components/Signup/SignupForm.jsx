import React, { useState } from 'react';
import ButtonCommon from '../../../../components/ButtonCommon';
import InputField from '../../../../components/InputField';
import { useForm } from 'react-hook-form';
import '../../styles/Signup.css';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from "react-router-dom";
import Checkbox from '../../../../components/Checkbox';

const SignupForm = ({ onSubmitForm, onSignup }) => {
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);

    const onChangeListener = () => {
        setChecked(!checked)
    }

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
    <div className='signupContainer'>
        <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete='off'
        className='signupForm'
        noValidate
        >
            <div className='inputContainer'>
                <InputField
                    title={"email"}
                    keyName={"email"}
                    placeholder={"Enter your email"}
                    register={register("email", {
                        required: 'Please enter your email',
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Invalid email format",
                        }
                    })}
                    errors={errors}
                />
                <InputField
                    title={"username"}
                    keyName={"name"}
                    placeholder={"Enter your username"}
                    register={register("name", {
                        required: 'Please enter your username',
                        minLength: {
                            value: 8,
                            message: "Username needs to be 8 characters or longer"
                        }
                    })}
                    errors={errors}
                />
                <InputField
                    title={"password"}
                    keyName={"password"}
                    placeholder={"Enter your password"}
                    type={"password"}
                    register={register("password", {
                        required: 'Please enter your password',
                        minLength: {
                            value: 8,
                            message: "Password needs to be 8 characters or longer"
                        }
                    })}
                    errors={errors}
                />
                <Checkbox 
                    label={"Enable 2FA?"} 
                    register={register("otp")} />
            </div>
            <div className='buttonContainer'>
                <ButtonCommon
                    title="Signup"
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

export default SignupForm