import { object, string } from "yup"; // for only what you need

export default object().shape({
  username: string()
    .max(255, "Form.validations.max")
    .required("Form.validations.required")
});
