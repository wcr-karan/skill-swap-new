import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./Profile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [matches, setMatches] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState("teach");

  useEffect(() => {
    if (token) loadDashboardData();
  }, [token]);

  useEffect(() => {
    if (token) {
      const interval = setInterval(loadDashboardData, 10000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const loadDashboardData = () => {
    fetch("http://localhost:5050/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()).then(setUser).catch(() => setUser(null));

    fetch("http://localhost:5050/skills/my", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()).then(setSkills).catch(() => setSkills([]));

    fetch("http://localhost:5050/matches", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()).then(setMatches).catch(() => setMatches([]));

    fetch("http://localhost:5050/matches/users")
      .then(res => res.json())
      .then(setAllUsers)
      .catch(() => setAllUsers([]));

    fetch("http://localhost:5050/swap/incoming", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()).then(setIncomingRequests).catch(() => setIncomingRequests([]));

    fetch("http://localhost:5050/swap/sent", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setSentRequests(data);
        const accepted = data.filter(r => r.status === "accepted");
        if (accepted.length > 0) {
          setNotifications(
            accepted.map(r => `🎉 ${r.toUser.name} accepted your swap request!`)
          );
        }
      })
      .catch(() => setSentRequests([]));
  };

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
      } else setMessage(data.error || "Login failed ❌");
    } catch {
      setMessage("Server error ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setSkills([]);
    setMatches([]);
    setIncomingRequests([]);
    setSentRequests([]);
    setAllUsers([]);
    setNotifications([]);
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
        setSkills(prev => [...prev, data]);
        setNewSkill("");
      }
    } catch {
      alert("Server error");
    }
  };

  const handleSwapRequest = async (targetUserId, skillWanted) => {
    try {
      const teachSkill = skills.find(s => s.type === "teach");
      if (!teachSkill) return alert("Add a teaching skill first.");

      await fetch("http://localhost:5050/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          toUserId: targetUserId,
          skillOffered: teachSkill.name,
          skillWanted
        })
      });

      alert("Swap request sent 🤝");
      loadDashboardData();
    } catch {
      alert("Server error");
    }
  };

  const handleRequestUpdate = async (id, status) => {
    await fetch(`http://localhost:5050/swap/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    loadDashboardData();
  };

  // ---------------- DASHBOARD ROUTES ----------------
  if (token) {
    return (
      <Routes>
        <Route path="/" element={
          <div style={{ padding: "40px", fontFamily: "Arial" }}>
            <h1>Welcome, {user?.name} 👋</h1>
            <p>Email: {user?.email}</p>
            <p>Bio: {user?.bio || "No bio yet"}</p>

            {notifications.length > 0 && (
              <div style={{ background: "#dff0d8", padding: "10px", margin: "15px 0" }}>
                <h3>Notifications 🔔</h3>
                <ul>{notifications.map((n, i) => <li key={i}>{n}</li>)}</ul>
              </div>
            )}

            <h2>Add a Skill</h2>
            <input value={newSkill} onChange={e => setNewSkill(e.target.value)} />
            <select value={skillType} onChange={e => setSkillType(e.target.value)}>
              <option value="teach">Teach</option>
              <option value="learn">Learn</option>
            </select>
            <button onClick={handleAddSkill}>Add</button>

            <h2>Your Skills</h2>
            <b>Teach</b>
            <ul>{skills.filter(s => s.type === "teach").map(s => <li key={s.id}>{s.name}</li>)}</ul>
            <b>Learn</b>
            <ul>{skills.filter(s => s.type === "learn").map(s => <li key={s.id}>{s.name}</li>)}</ul>

            <h2>Browse People 🌍</h2>
            <ul>
              {allUsers.filter(u => u.id !== user?.id).map(u => (
                <li key={u.id}>
                  <Link to={`/profile/${u.id}`}><b>{u.name}</b></Link>
                  <ul>
                    {u.skills.map(skill => (
                      <li key={skill.id}>
                        Teaches {skill.name}
                        <button onClick={() => handleSwapRequest(u.id, skill.name)}>
                          Request Swap
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <h2>Incoming Requests</h2>
            <ul>
              {incomingRequests.map(req => (
                <li key={req.id}>
                  {req.fromUser.name} wants {req.skillWanted} — {req.status}
                  {req.status === "pending" && (
                    <>
                      <button onClick={() => handleRequestUpdate(req.id, "accepted")}>Accept</button>
                      <button onClick={() => handleRequestUpdate(req.id, "rejected")}>Reject</button>
                    </>
                  )}
                </li>
              ))}
            </ul>

            <h2>Sent Requests</h2>
            <ul>
              {sentRequests.map(req => (
                <li key={req.id}>You requested {req.toUser.name} — {req.status}</li>
              ))}
            </ul>

            <button onClick={handleLogout}>Logout</button>
          </div>
        } />

        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    );
  }

  // ---------------- LOGIN SCREEN ----------------
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Skill Swap Platform 🔁</h1>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
