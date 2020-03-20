import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

// Components
import { Form, FormikProps, withFormik, Field } from "formik";
import { Grid, Card, Button } from "@material-ui/core";
import FormField from "components/common/form/FormField";
import FormError from "components/common/form/FormError";

// Actions
import { login } from "redux/user/userActions";

// Types
import { Error } from "redux/types";
import { ILoginActionPayload } from "redux/user/types";

// Selectors
import { selectUserError } from "redux/user/userSelectors";

// Others
import validationSchema from "./LoginFormValidationSchema";
import { IState } from "redux/rootReducer";

const StyledFormWrapper = styled(Grid)`
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 14rem);
`;

const StyledLoginFormWrapper = styled(Card)`
  padding: 3.5rem 5rem;
  width: 40rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 100%;
    padding: 2rem;
    top: -3.3rem;
    left: 0;
    height: calc(100vh - 6rem);
    display: flex;
    justify-content: center;
    align-items: center;
    transform: none;
  }
`;

const StyledFieldWrapper = styled(Grid)`
  margin-bottom: 2rem;
  &:last-of-type {
    margin-bottom: 3.5rem;
  }
`;

const StyledButton = styled(Button)`
  margin-bottom: 1.2rem;
  margin-left: auto;
`;

const StyledLoginError = styled.p`
  color: ${({ theme }) => theme.color.error};
  font-size: ${({ theme }) => theme.text.fontSize.small};
  margin-bottom: 1.2rem;
`;

interface ILoginFormValues {
  username: string;
}

interface ILoginFormProps extends ILoginFormValues {
  login: (username: string) => { type: string; payload: ILoginActionPayload };
  loginErrorCode: Error | null;
}

const LoginPage = (props: ILoginFormProps & FormikProps<ILoginFormValues>) => {
  const { touched, isSubmitting, values, loginErrorCode } = props;

  return (
    <StyledFormWrapper container>
      <StyledLoginFormWrapper>
        <Form>
          <StyledFieldWrapper>
            <Field
              name="username"
              type="text"
              label="username"
              value={values.username}
              placeholder="Type your username"
              component={FormField}
            />

            <FormError touched={touched.username}>
              User name is required
            </FormError>
          </StyledFieldWrapper>

          {loginErrorCode && (
            <StyledLoginError>Wrong user credentials</StyledLoginError>
          )}

          <Grid container justify="space-between">
            <StyledButton type="submit" color="primary" disabled={isSubmitting}>
              Login
            </StyledButton>
          </Grid>
        </Form>
      </StyledLoginFormWrapper>
    </StyledFormWrapper>
  );
};

const WithFormikLoginPage = withFormik<ILoginFormProps, ILoginFormValues>({
  displayName: "Login form",
  validationSchema,
  handleSubmit(values, { props, setSubmitting }) {
    props.login(values.username);
    setSubmitting(false);
  },
  mapPropsToValues(props) {
    return {
      username: props.username || ""
    };
  }
})(LoginPage);

export default connect(
  (state: IState) => ({
    loginErrorCode: selectUserError(state)
  }),
  { login }
)(WithFormikLoginPage);
