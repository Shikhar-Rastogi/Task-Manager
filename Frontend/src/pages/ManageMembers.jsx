import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

const ManageMembers = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");

  const fetchMembers = async () => {
    const { data } = await API.get(`/projects/${id}`);
    setMembers(data.members || []);
  };

  useEffect(() => {
    fetchMembers();
  }, [id]);

  const addMember = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    await API.post(`/projects/${id}/members`, { email });
    setEmail("");
    fetchMembers();
  };

  const removeMember = async (userId) => {
    await API.delete(`/projects/${id}/members/${userId}`);
    fetchMembers();
  };

  return (
    <div className="page">
      <h2>Manage Members</h2>

      <form className="form" onSubmit={addMember}>
        <label>Add Member (Email)</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn-primary">Add</button>
      </form>

      <div className="card-list">
        {members.map((m) => (
          <div key={m._id} className="card">
            <p>{m.name} ({m.email})</p>
            <button className="btn-danger" onClick={() => removeMember(m._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMembers;