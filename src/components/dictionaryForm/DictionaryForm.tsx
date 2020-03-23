import React from "react";
import styled from "styled-components";
import { pathOr } from "ramda";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

// Components
import { Field } from "formik";
import { Grid, Card, Button } from "@material-ui/core";
import FormField from "components/common/form/FormField";
import FormError from "components/common/form/FormError";
import FormSelect from "components/common/form/FormSelect";

// Actions
import { createDictionary } from "redux/dictionaries/dictionariesActions";

// Others
import validationSchema from "./DictionaryFormValidationSchema";

const StyledFormWrapper = styled(Grid)`
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 14rem);
`;

const StyledDictionaryFormWrapper = styled(Card)`
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

interface DictionaryFormProps {
  id: string;
  name: string;
  language: string;
  submitCallback: any;
}

const DictionaryForm = ({
  language,
  name,
  submitCallback
}: DictionaryFormProps) => {
  const dispatch = useDispatch();
  const handleSubmit = (
    values: { name: string; language: string },
    { props, setSubmitting }: any
  ) => {
    dispatch(createDictionary(values.name, values.language));
    submitCallback();
    setSubmitting(false);
  };

  return (
    <StyledFormWrapper container>
      <StyledDictionaryFormWrapper>
        <Formik
          initialValues={{
            name,
            language
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit, touched, isSubmitting, errors }) => (
            <Grid
              container
              component="form"
              direction="column"
              onSubmit={handleSubmit}
            >
              <StyledFieldWrapper>
                <Field
                  name="name"
                  type="text"
                  label="Dictionary name"
                  value={values.name}
                  placeholder="Type dictionary name"
                  component={FormField}
                />

                <FormError
                  hasError={pathOr(false, ["name"], errors)}
                  touched={touched.name}
                >
                  Dictionary name is required
                </FormError>
              </StyledFieldWrapper>

              <StyledFieldWrapper>
                <Field
                  name="language"
                  label="Dictionary language"
                  placeholder="Select dictionary language"
                  component={FormSelect}
                  options={[
                    { value: "en", label: "English" },
                    { value: "sk", label: "Slovak" }
                  ]}
                />
              </StyledFieldWrapper>

              <Grid container justify="space-between">
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Create Dictionary
                </StyledButton>
              </Grid>
            </Grid>
          )}
        </Formik>
      </StyledDictionaryFormWrapper>
    </StyledFormWrapper>
  );
};

export default DictionaryForm;
