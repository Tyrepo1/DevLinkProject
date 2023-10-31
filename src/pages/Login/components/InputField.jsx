import React from "react";
import "../styles/InputField.css"

const InputField = ({
  title,
  keyName,
  placeholder,
  register,
  maxLength,
  errors = {},
}) => {

  return (
    <div>
        <div >
          <input
            required
            placeholder={placeholder}
            {...register}
            type="text"
            maxLength={maxLength}
            className="inputText"
          />
        </div>
        {errors[keyName] && (
        <div style={{ fontSize: "12px", color: "#ff0000" , textAlign: "left", marginLeft: "20px"}}>
          {`Please enter your ${title}`}
        </div>
      )}
    </div>
  );
};
export default InputField;
