const TaskForm = ({ form, setForm, onSubmit }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <label>Title</label>
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

      <label>Description</label>
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

      <label>Deadline</label>
      <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />

      <label>Priority</label>
      <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="btn-primary">Save</button>
    </form>
  );
};

export default TaskForm;