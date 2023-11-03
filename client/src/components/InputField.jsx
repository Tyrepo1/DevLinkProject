import React from "react";
import "../styles/InputField.css"
import { TextField } from "@mui/material";

const InputField = ({
  required,
  label,
  register,
  keyName,
  errors = {},
  type,
}) => {
  return (
    <TextField
      type={type}
      required={required}
      id={required ? 'outlined-required' : 'outlined'}
      label={label}
      placeholder={"Enter your " + label?.toLowerCase()}
      {...register}
      fullWidth
      error={!!errors[keyName]}
      helperText={errors[keyName] ? `${errors[keyName].message}` : undefined}
      sx={{
        mb: "2rem"
      }}
    />
  );
};

export default InputField;
