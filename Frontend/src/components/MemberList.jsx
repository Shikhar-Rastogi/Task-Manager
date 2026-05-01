// src/components/MemberList.jsx
import { FiUser, FiTrash2 } from "react-icons/fi";

const MemberList = ({ members, onRemove }) => {
  if (!members || members.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No members yet
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((m) => (
        <div
          key={m._id}
          className="flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition"
        >

          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-3">

            {/* Avatar */}
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
              {m.name?.charAt(0)?.toUpperCase() || <FiUser />}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {m.name}
              </span>
              <span className="text-xs text-gray-500">
                {m.email}
              </span>
            </div>

          </div>

          {/* Right: Remove button */}
          {onRemove && (
            <button
              onClick={() => onRemove(m._id)}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition"
            >
              <FiTrash2 />
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MemberList;