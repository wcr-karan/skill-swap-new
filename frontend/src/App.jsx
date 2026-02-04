import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);

  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState("teach");

  useEffect(() => {
    if (token) {
      // Fetch logged-in user
      fetch("http://localhost:5050/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => setUser(null));

      // Fetch user skills
      fetch("http://localhost:5050/skills/my", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setSkills(data))
        .catch(() => setSkills([]));
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const res = await fetch("http://localhost:5050/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setMessage("");
      } else {
        setMessage(data.error || "Login failed ❌");
      }
    } catch {
      setMessage("Server error ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setSkills([]);
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const res = await fetch("http://localhost:5050/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newSkill, type: skillType })
      });

      const data = await res.json();

      if (res.ok) {
        setSkills([...skills, data]);
        setNewSkill("");
      } else {
        alert(data.error || "Failed to add skill");
      }
    } catch {
      alert("Server error");
    }
  };

  // ---------------- DASHBOARD ----------------
  if (token) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <h1>Welcome, {user?.name || "User"} 👋</h1>
        <p>Email: {user?.email}</p>
        <p>Bio: {user?.bio || "No bio yet"}</p>

        <h2>Add a Skill</h2>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter skill (e.g. Python)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            style={{ padding: "6px", marginRight: "10px" }}
          />

          <select
            value={skillType}
            onChange={(e) => setSkillType(e.target.value)}
            style={{ padding: "6px", marginRight: "10px" }}
          >
            <option value="teach">Teach</option>
            <option value="learn">Learn</option>
          </select>

          <button onClick={handleAddSkill}>Add Skill</button>
        </div>

        <h2>Your Skills</h2>

        <h3>Teach 🧠</h3>
        <ul>
          {skills.filter(s => s.type === "teach").map(skill => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>

        <h3>Learn 📚</h3>
        <ul>
          {skills.filter(s => s.type === "learn").map(skill => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>

        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // ---------------- LOGIN SCREEN ----------------
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Skill Swap Platform 🔁</h1>

      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        <button type="submit" style={{ marginTop: "15px", padding: "8px 16px" }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>{message}</p>
    </div>
  );
}

export default App;
