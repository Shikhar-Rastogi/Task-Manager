// src/components/ProjectCard.jsx
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project._id}`}>
      <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100">

        {/* Project Name */}
        <h3 className="text-lg font-semibold text-gray-800">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {project.description || "No description available"}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">

          {/* Members */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaUsers className="text-gray-400" />
            {project.members?.length || 0} Members
          </div>

          {/* View */}
          <span className="text-blue-600 text-sm font-medium">
            View →
          </span>

        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;