import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfileStats } from "../api/userApi";
import "../styles/profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getProfileStats();
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load profile stats");
      }
    };

    fetchStats();
  }, []);

  if (!user) return null;

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        {stats && (
          <>
            <p>
              <strong>Events Created:</strong> {stats.eventsCreated}
            </p>
            <p>
              <strong>Events Attended:</strong> {stats.eventsAttended}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
