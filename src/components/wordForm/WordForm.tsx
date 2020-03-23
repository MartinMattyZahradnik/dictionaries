import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { pathOr } from "ramda";

// Components
import { Formik, Field } from "formik";
import { Grid, Card, Button, Typography } from "@material-ui/core";
import FormField from "components/common/form/FormField";
import FormError from "components/common/form/FormError";

// Actions
import { createWord } from "redux/dictionaries/dictionariesActions";

// Others
import validationSchema from "./WordFormValidationSchema";
import { translationService } from "utils/translationService";

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

interface WordFormProps {
  dictionaryId: string;
  submitCallback: Function;
  text: string;
  languageCode: string;
}

const WordForm = ({
  languageCode,
  submitCallback,
  text,
  dictionaryId
}: WordFormProps) => {
  const dispatch = useDispatch();
  const [translation, setTranslation] = useState("");

  const handleTranslateWord = async ({ value }: any) => {
    if (value) {
      const res = await translationService(value, languageCode);
      if (res) {
        const translation = res.data.data.translations[0].translatedText;
        setTranslation(translation);
      }
    }
  };

  const handleSubmit = (values: { text: string }, { setSubmitting }: any) => {
    dispatch(
      createWord({
        text: values.text,
        translation,
        dictionaryId
      })
    );

    submitCallback();
    setSubmitting(false);
  };

  return (
    <StyledFormWrapper container>
      <StyledWordFormWrapper>
        <Formik
          initialValues={{ text }}
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
                  name="text"
                  type="text"
                  label="Word"
                  value={values.text}
                  placeholder="Type word"
                  component={FormField}
                  onChange={handleTranslateWord}
                />

                <FormError
                  hasError={pathOr(false, ["text"], errors)}
                  touched={touched.text}
                >
                  Word field is required
                </FormError>
              </StyledFieldWrapper>

              <Typography>Translation: {translation}</Typography>

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
            </Grid>
          )}
        </Formik>
      </StyledWordFormWrapper>
    </StyledFormWrapper>
  );
};

export default WordForm;
