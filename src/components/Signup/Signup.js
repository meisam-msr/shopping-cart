import Input from "../../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../services/signupService";
import { useState, useEffect } from "react";
import { useAuth, useAuthActions } from "../../providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(4, "Name length is not valid"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number")
    .nullable(),
  password: Yup.string().required("Password is required")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  passwordConfirm: Yup.string()
    .required("Password Confirmation is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

const SignupForm = () => {
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
    const { name, email, password, phoneNumber } = values;

    const userData = {
      name,
      email,
      phoneNumber,
      password,
    };

    try {
      const { data } = await signupUser(userData);
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
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="phoneNumber"
          label="Phone Number"
          type="tel"
        />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
        />
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
          style={{ width: "100%" }}
        >
          Signup
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="linkContainer">
          <p>Already have an account?</p>
          <Link to={`/login?redirect=${redirect}`}>Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
