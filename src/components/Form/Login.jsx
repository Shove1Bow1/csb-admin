import { Field, Form, Formik } from "formik";
import { loginRequest } from "../../axios/login.axios";
import {
  validateName,
  validatePassword,
} from "../../validator/validate-form.login";
import "./Form.sass";
export const LoginForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
        serverError: "",
      }}
      onSubmit={(values) => {
        const error =
          validateName(values.name) || validatePassword(values.password);
        if (error) {
          return;
        }
        const data = loginRequest(values.name, values.password);
      }}
    >
      {({ errors, touched, isValidating, validateForm }) => {
        return (
          <Form className="formik">
            <legend className="formik-legend">ADMIN PAGE <br/> CALL SPAM BLOCKER</legend>
            <div className="formik-block">
              <label className="formik-label">admin name</label>
              <Field
                name="name"
                placeholder="admin name"
                type="text"
                validate={validateName}
                className="formik-field"
              />
            </div>
            <span className="formik-error">
              {touched.name && errors.name ? errors.name : null}
            </span>
            <div className="formik-block">
              <label className="formik-label">password</label>
              <Field
                name="password"
                placeholder="password"
                type="password"
                validate={validatePassword}
                className="formik-field"
              />
            </div>
            <span className="formik-error">
              {touched.password && errors.password ? errors.password : null}
            </span>
            <span className="formik-error">
              {touched.serverError && errors.serverError
                ? errors.serverError
                : null}
            </span>
            <button className="formik-button" type="submit">
              Login
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
