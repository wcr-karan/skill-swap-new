import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5050/matches/users")
      .then(res => res.json())
      .then(data => {
        const found = data.find(u => u.id === parseInt(id));
        setUser(found);
      });
  }, [id]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <Link to="/">⬅ Back to Dashboard</Link>
      <h1>{user.name}'s Profile</h1>
      <p><strong>Bio:</strong> {user.bio || "No bio added yet."}</p>

      <h2>Skills They Teach 🧠</h2>
      <ul>
        {user.skills.filter(s => s.type === "teach").map(skill => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>

      <h2>Skills They Want to Learn 📚</h2>
      <ul>
        {user.skills.filter(s => s.type === "learn").map(skill => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
