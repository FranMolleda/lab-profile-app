import React from "react";
import { useForm } from "react-hook-form";
import Button from "../buttons/Index";
import { FormStyle, FormContainer } from "../../components/styles/FormStyle";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <FormContainer>
        <Link to="/" className="button">
          Home
        </Link>
        <Link to="/login" className="button">
          Login
        </Link>

        <FormStyle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label name="username">Username</label>
            <input name="usename" ref={register} />
            {errors.username && "username is required."}
            <label name="password">Password</label>
            <input name="password" ref={register({ required: true })} />
            {errors.password && "Password is required."}
            <label name="campus">Campus</label>
            <input name="campus" ref={register} />
            {errors.campus && "Please enter campus."}
            <label name="course">Course</label>
            <input name="course" ref={register} />
            {errors.campus && "Please enter course."}
            <input type="submit" />
          </form>
        </FormStyle>
      </FormContainer>
    </>
  );
}

export default Signup;
