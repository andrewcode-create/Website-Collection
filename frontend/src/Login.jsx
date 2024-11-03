const Login = ({ email, setEmail, password, setPassword, register, login }) => {
  const isFormValid = email.includes("@") && password.length > 6;
  return (
    <div>
      <h1>Login:</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register} disabled={!isFormValid}>
        Register
      </button>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
