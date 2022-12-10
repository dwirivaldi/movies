import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Minimum 6 Characters")
        .required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 Characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Movie DB auth step 1
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}authentication/token/new?api_key=${process.env.REACT_APP_NOT_SECRET_CODE}`
        )
        .then((response) => {
          // handle response
          const requestToken = response.data.request_token;
          console.log(requestToken);
          axios
            .post(
              `${process.env.REACT_APP_BASEURL}authentication/token/validate_with_login?api_key=${process.env.REACT_APP_NOT_SECRET_CODE}`,
              {
                username: values.username, // dwirivaldi
                password: values.password, // rivaldy21
                request_token: requestToken,
              }
            )
            .then((res) => {
              const validatedRequestToken = res.data.request_token;
              console.log(validatedRequestToken);
            });
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <div>{formik.errors.username}</div>
      ) : null}
      <br />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.pasword}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
