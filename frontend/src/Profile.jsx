import { useState, useEffect } from "react";

function Profile() {
  const [token] = useState(localStorage.getItem("token"));
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setBio(data.bio || ""));
  }, [token]);

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5050/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ bio })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Profile updated successfully ✅");
      } else {
        setMessage(data.error || "Update failed ❌");
      }
    } catch {
      setMessage("Server error ❌");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Edit Profile 👤</h1>

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Write something about yourself..."
        rows="5"
        style={{ width: "300px", padding: "10px" }}
      />

      <br /><br />

      <button onClick={handleSave}>Save Bio</button>

      <p>{message}</p>
    </div>
  );
}

export default Profile;

