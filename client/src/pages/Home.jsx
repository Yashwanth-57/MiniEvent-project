import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Mini Event Platform</h1>
      <p className="home-subtitle">
        Create events, join events, and manage your RSVPs easily.
      </p>

      <div className="home-actions">
        <Button text="Login" onClick={() => navigate("/login")} />
        <Button text="Register" onClick={() => navigate("/register")} />
      </div>
    </div>
  );
}

export default Home;

