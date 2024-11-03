const Login = ({ email, setEmail, password, setPassword, register, login }) => {
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
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
