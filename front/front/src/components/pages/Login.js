import React from "react";
import { useForm } from "react-hook-form";
import Button from "../buttons/Index";
import { FormStyle, FormContainer } from "../../components/styles/FormStyle";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Login() {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <FormContainer>
        <Link to="/" className="button">
          Home
        </Link>
        <Link to="/signup" className="button">
          Signup
        </Link>
        <FormStyle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label name="username">Username</label>
            <input name="usename" ref={register} />
            {errors.username && "username is required."}
            <label name="password">Password</label>
            <input name="password" ref={register({ required: true })} />
            {errors.password && "Password is required."}

            <input type="submit" />
          </form>
        </FormStyle>
      </FormContainer>
    </>
  );
}

export default Login;
