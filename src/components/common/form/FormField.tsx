import React from "react";
import styled from "styled-components";
import { FieldProps } from "formik";

// Components

import { TextField } from "@material-ui/core";

const StyledTextField = styled(TextField)`
  .MuiInputLabel-root {
    font-size: 1.4rem;
  }

  .MuiInputBase-input {
    font-size: 1.4rem;
  }

  .MuiFormLabel-root.Mui-focused {
    color: ${({ theme }) => theme.color.primary};
  }
`;

interface IProps extends FieldProps {
  placeholder: string;
  label: string;
  type: string;
  multiline?: boolean;
  onChange?: Function;
  field: any;
}

const Field: React.FC<IProps> = ({
  placeholder,
  label,
  type,
  field,
  multiline = false,
  onChange
}) => {
  if (onChange) {
    onChange(field);
  }

  return (
    <StyledTextField
      multiline={multiline}
      placeholder={placeholder}
      type={type}
      label={label}
      onChange={() => alert("!!!")}
      {...field}
    />
  );
};

export default Field;
