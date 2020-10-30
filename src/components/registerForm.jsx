import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { register } from "../services/userService";
import auth from "../services/authService";
class RegisterForm extends Form {
  username = React.createRef();
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    // Call the Server
    try {
      const { data } = this.state;
      const response = await register(data.username, data.password, data.name);
      auth.login(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
