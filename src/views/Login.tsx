import { Outlet, Link } from "react-router-dom";

function Login() {
  return (
    <div className="content-container ml-0">
      <h1 className="text-2xl m-5">Login</h1>
      <Link to={"/cliente"}>Entrar</Link>
    </div>
  );
}

export default Login;
