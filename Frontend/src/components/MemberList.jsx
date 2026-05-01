const MemberList = ({ members, onRemove }) => {
  return (
    <div className="card-list">
      {members.map((m) => (
        <div key={m._id} className="card">
          <p>{m.name} ({m.email})</p>
          {onRemove && (
            <button className="btn-danger" onClick={() => onRemove(m._id)}>
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MemberList;