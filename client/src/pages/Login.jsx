import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/authApi";
import { loginSuccess, logout } from "../redux/authSlice";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    //  clear any previous auth
    dispatch(logout());
    sessionStorage.clear();

    try {
      const response = await loginUser({ email, password });

      //  validate response properly
      if (!response?.data?.token || !response?.data?.user) {
        throw new Error("Invalid login response");
      }

      console.log("helll");
      const { token, user } = response.data;

      // Redux
      dispatch(loginSuccess({ token, user }));

      // Storage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
 console.log("hellliiiiiiiiiiiiiiiiiiiiii");
      //  Navigate ONLY on success
      navigate("/dashboard", { replace: true });

    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message || "Invalid email or password";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
