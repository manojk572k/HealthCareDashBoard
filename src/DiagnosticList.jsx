import "./DiagnosticList.css";

function DiagnosticList({ data }) {
  return (
    <div className="diagnostic-section">
      <h2 className="diagnostic-title">Diagnostic List</h2>

      <div className="diagnostic-table">
        <div className="table-header">
          <span>Problem/Diagnosis</span>
          <span>Description</span>
          <span>Status</span>
        </div>

      <div className="table-body">
        {data.map((diag, index) => (
    <div className="table-row" key={index}>
      <span>{diag.name}</span>
      <span>{diag.description}</span>
      <span className="status">{diag.status}</span>
    </div>
           ))}
      </div>
      </div>
    </div>
  );
}

export default DiagnosticList;