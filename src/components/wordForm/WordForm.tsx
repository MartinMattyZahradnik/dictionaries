import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

// Components
import { Form, FormikProps, withFormik, Field } from "formik";
import { Grid, Card, Button } from "@material-ui/core";
import FormField from "components/common/form/FormField";
import FormError from "components/common/form/FormError";

// Actions
import { createWord } from "redux/dictionaries/dictionariesActions";

// Types
import {
  CreateWordActionPayload,
  CreateWordActionType
} from "redux/dictionaries/types";

// Others
import validationSchema from "./WordFormValidationSchema";

const StyledFormWrapper = styled(Grid)`
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 14rem);
`;

const StyledWordFormWrapper = styled(Card)`
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

interface WordFormValues {
  text: string;
  translation: string;
}

interface WordFormProps {
  createWord: (word: CreateWordActionPayload) => CreateWordActionType;
  dictionaryId: string;
  submitCallback: any;
}

const WordForm = (props: WordFormProps & FormikProps<WordFormValues>) => {
  const { touched, isSubmitting, values } = props;

  return (
    <StyledFormWrapper container>
      <StyledWordFormWrapper>
        <Form>
          <StyledFieldWrapper>
            <Field
              name="text"
              type="text"
              label="Word"
              value={values.text}
              placeholder="Type word"
              component={FormField}
            />

            <FormError touched={touched.text}>Word field is required</FormError>
          </StyledFieldWrapper>

          <Grid container justify="space-between">
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Save word
            </StyledButton>
          </Grid>
        </Form>
      </StyledWordFormWrapper>
    </StyledFormWrapper>
  );
};

const WithFormikWordForm = withFormik<WordFormProps, WordFormValues>({
  displayName: "Word form",
  validationSchema,
  handleSubmit(values, { props, setSubmitting }) {
    console.log(values, "values");
    console.log(props, "props");
    props.createWord({
      text: values.text,
      translation: values.translation,
      dictionaryId: props.dictionaryId
    });
    props.submitCallback();
    setSubmitting(false);
  }
})(WordForm);

export default connect(null, { createWord })(WithFormikWordForm);
