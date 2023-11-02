import React from "react";
import "../styles/InputField.css"

const InputField = ({
  title,
  keyName,
  placeholder,
  register,
  maxLength,
  type,
  errors = {},
}) => {

  return (
    <div>
        <div >
          <input
            required
            placeholder={placeholder}
            {...register}
            type= {type}
            maxLength={maxLength}
            className="inputText"
          />
        </div>
        {errors[keyName] && (
        <div style={{ fontSize: "12px", color: "#ff0000" , textAlign: "left", marginLeft: "20px"}}>
          {`${errors[keyName].message}`}
        </div>
      )}
    </div>
  );
};
export default InputField;
