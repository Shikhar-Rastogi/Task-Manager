import "./components.css";

const ProjectCard = ({ project }) => {
  return (
    <div className="card">
      <h3>{project.name}</h3>
      <p style={{ color: "var(--muted)", marginTop: "6px" }}>
        {project.description || "No description"}
      </p>
      <p style={{ marginTop: "10px", fontSize: "13px", color: "var(--muted)" }}>
        Members: {project.members?.length || 0}
      </p>
    </div>
  );
};

export default ProjectCard;