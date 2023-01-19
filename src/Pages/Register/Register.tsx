import React from "react";
import { NavLink } from "react-router-dom";
import FormInput from "../../Components/FormInput";

type Props = {};

const Register = (props: Props) => {
  let listRender: string[] = [
    "email",
    "password",
    "comfirm",
    "name",
    "phone",
    "login",
  ];
  return (
    <form className="register">
      <FormInput
        listRender={listRender}
        textButton="Register"
        link={
          <NavLink className="mt-2" to="/login">
            I already have an account
          </NavLink>
        }
      />
    </form>
  );
};

export default Register;
