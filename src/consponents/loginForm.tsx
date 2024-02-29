import React from 'react';

type LoginFormType = {
  onSubmit: Function
};

const LoginForm = ({ onSubmit }: LoginFormType) => {
  // @ts-ignore
  const handleInputChange = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    // @ts-ignore
    onSubmit(formProps.userName);
  };

  return (
    <div className="login-form">
      <h3 className="login-form__header">Sign in</h3>
      <form onSubmit={handleInputChange} className="login-form__wrapper">
        <input type="text" name="userName" required className="login-form__input"/>
        <button type="submit" className="login-form__button">Sign in</button>
      </form>
    </div>
  );
};

export default LoginForm;
