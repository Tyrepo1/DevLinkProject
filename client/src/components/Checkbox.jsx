import React, { useState } from 'react';
import "../styles/Checkbox.css"

function Checkbox({ label, register }) {

  return (
    <label>
      <input
        type="checkbox"
        {...register}
        className='checkbox'
      />
      {label}
    </label>
  );
}

export default Checkbox;
