// src/components/FormInput.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, type = 'text' }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default FormInput;
