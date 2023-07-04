import React from "react";

const LoginForm = (props) => {
  const { e, email } = props;
  const { p, password } = props;

  return (
    <div>
      <h1>Login</h1>
      {/* <LoginForm
        onClick={handleSubmit}
        onSubmit={LoginUser}
        email={email}
        password={password}
      /> */}
      <form onSubmit={props.onSubmit}>
        <div>
          <div className="input-box">
            <label htmlFor="email" className="details">
              Username:
              <input
                onChange={e}
                value={email}
                id="email"
                type={"text"}
                placeholder="Enter Your Email"
              />
            </label>
          </div>
          <div className="input-box">
            <label htmlFor="password" className="details">
              Password:
              <input
                onChange={p}
                value={password}
                id="password"
                type={"password"}
                placeholder="Enter Password"
              />
            </label>
          </div>
        </div>
        <button className="btn btn-outline-success">Login</button>
      </form>
    </div>
  );
};
export default LoginForm;
