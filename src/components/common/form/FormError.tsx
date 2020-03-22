import React from "react";
import styled from "styled-components";

// Components
import { Typography } from "@material-ui/core";

const StyledErrorMsg = styled(Typography)`
  color: ${({ theme }) => theme.color.error};
  margin-top: 1rem;
`;

interface FormErrorProps {
  hasError: boolean;
  touched: boolean | undefined;
  children: React.ReactNode;
}

const FormError = ({ touched, children, hasError = false }: FormErrorProps) => {
  return touched && hasError ? (
    <StyledErrorMsg>{children}</StyledErrorMsg>
  ) : null;
};

export default FormError;
