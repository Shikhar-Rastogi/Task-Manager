// src/components/TaskForm.jsx
import { FaTasks, FaCalendarAlt } from "react-icons/fa";

const TaskForm = ({ form, setForm, onSubmit, loading = false }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <FaTasks className="text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          Task Details
        </h2>
      </div>

      {/* Title */}
      <div>
        <label className="text-sm text-gray-600">Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-600">Description</label>
        <textarea
          rows="3"
          placeholder="Optional description..."
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Deadline */}
      <div>
        <label className="text-sm text-gray-600 flex items-center gap-2">
          <FaCalendarAlt /> Deadline
        </label>
        <input
          type="date"
          value={form.deadline}
          onChange={(e) =>
            setForm({ ...form, deadline: e.target.value })
          }
          className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="text-sm text-gray-600">Priority</label>
        <select
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value })
          }
          className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Task"}
      </button>
    </form>
  );
};

export default TaskForm;