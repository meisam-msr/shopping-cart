import Input from "../../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "../../services/loginService";
import { useAuth, useAuthActions } from "../../providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

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
  const query = useQuery();
  const redirect = query.get("redirect") || "";

  let navigate = useNavigate();
  const setAuth = useAuthActions();
  const auth = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth) navigate(`/${redirect}`);
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);

      setError(null);
      navigate(`/${redirect}`);
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
          <Link to={`/signup?redirect=${redirect}`}>Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
