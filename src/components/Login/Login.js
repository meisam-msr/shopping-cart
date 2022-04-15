import Input from "../../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/loginService";
import { useAuthActions } from "../../providers/AuthProvider";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  let navigate = useNavigate();
  const setAuth = useAuthActions();
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);

      setError(null);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="email" label="email" type="email" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
          style={{ width: "100%" }}
        >
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="linkContainer">
          <p>Don't have an account?</p>
          <Link to="/signup">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
