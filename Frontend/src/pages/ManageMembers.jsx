import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import MemberList from "../components/MemberList";
import useAuth from "../hooks/useAuth";
import { FaUserPlus } from "react-icons/fa";

const ManageMembers = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchProject = async () => {
    const { data } = await API.get(`/projects/${id}`);
    setProject(data);
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        await fetchProject();
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const isAdmin = useMemo(() => {
    return (
      project?.members?.some(
        (m) =>
          m.user._id.toString() === user?._id?.toString() &&
          m.role === "Admin"
      ) || false
    );
  }, [project, user]);

  const members = project?.members?.map((m) => m.user) || [];

  const handleAddMember = async (event) => {
    event.preventDefault();

    if (!userId.trim()) {
      alert("User ID is required");
      return;
    }

    try {
      setSaving(true);
      await API.post(`/projects/${id}/add-member`, { userId });
      setUserId("");
      await fetchProject();
    } catch (err) {
      alert("Failed to add member");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      setSaving(true);
      await API.post(`/projects/${id}/remove-member`, { userId: memberId });
      await fetchProject();
    } catch (err) {
      alert("Failed to remove member");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading members...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!project) {
    return <div className="p-6 text-red-500">Project not found</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Manage Members
        </h2>
        <p className="text-sm text-gray-500">
          {project.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-800 mb-4">
            Team Members
          </h3>
          <MemberList members={members} onRemove={isAdmin ? handleRemoveMember : null} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-800 mb-4">
            Add Member
          </h3>
          {isAdmin ? (
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Paste a user id"
                  className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                <FaUserPlus />
                {saving ? "Adding..." : "Add Member"}
              </button>
            </form>
          ) : (
            <p className="text-sm text-gray-500">
              Only project admins can add or remove members.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;
