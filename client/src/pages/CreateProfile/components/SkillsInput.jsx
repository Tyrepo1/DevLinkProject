import React from 'react';
import { Controller } from 'react-hook-form';
import { Chip, TextField } from '@mui/material';

function SkillsInput({ fieldName, fieldArray, control, label }) {
  const { fields, append, remove } = fieldArray;

  const handleTagInputChange = (event) => {
    if (event.target.value.includes(' ')) {
      event.preventDefault();
      return;
    }
  };

  const handleTagInputKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      append({ [fieldName]: event.target.value.trim() });
      event.target.value = '';
    }
  };

  return (
    <span>
      <TextField
        label={label}
        type="text"
        fullWidth
        InputProps={{
          onKeyDown: handleTagInputKeyDown,
          onChange: handleTagInputChange,
        }}
      />
      <div className='flex flex-wrap'>
        {fields.map((field, index) => (
          <div key={field.id}>
            <Controller
              name={`${fieldName}.${index}.${fieldName}`}
              control={control}
              defaultValue={field[fieldName] || ''} 
              render={({ field }) => (
                <Chip
                  label={field.value}
                  onDelete={() => remove(index)}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              )}
            />
          </div>
        ))}
      </div>
    </span>
  );
}

export default SkillsInput;
