import React, { useEffect, useState } from "react";
import api from "../../api"; // NOTE: ../../ because Projects is in a subfolder

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    client: "",
    status: "New",
    budget: "",
    startDate: "",
    endDate: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // set in Login
  const isAdmin = role === "admin";

  // Load projects when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
    api
      .get("/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch(() => setError("Failed to load projects."));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      client: "",
      status: "New",
      budget: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token || !isAdmin) {
      setError("Only admin can create or update projects.");
      return;
    }

    try {
      let res;
      if (editingId) {
        // UPDATE
        res = await api.put(`/projects/${editingId}`, form);
        setProjects((prev) =>
          prev.map((p) => (p._id === editingId ? res.data : p))
        );
        setMessage("Project updated successfully.");
      } else {
        // CREATE
        res = await api.post("/projects", form);
        setProjects((prev) => [...prev, res.data]);
        setMessage("Project added successfully.");
      }
      resetForm();
    } catch (err) {
      setError("Error saving project.");
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      name: project.name || "",
      client: project.client || "",
      status: project.status || "New",
      budget: project.budget || "",
      startDate: project.startDate
        ? project.startDate.substring(0, 10)
        : "",
      endDate: project.endDate ? project.endDate.substring(0, 10) : "",
    });
    setMessage("");
    setError("");
  };

  const handleDelete = async (id) => {
    setMessage("");
    setError("");

    if (!token || !isAdmin) {
      setError("Only admin can delete projects.");
      return;
    }

    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setMessage("Project deleted.");
    } catch (err) {
      setError("Error deleting project.");
    }
  };

  return (
    <section className="section">
      <div className="container text-white">
        <h1 className="mb-4 text-center">Projects</h1>

        {/* Info messages */}
        {message && (
          <div className="alert alert-success py-2">{message}</div>
        )}
        {error && (
          <div className="alert alert-danger py-2">{error}</div>
        )}

        {!token && (
          <p className="text-center">
            You can view projects, but you need to{" "}
            <a href="/login">log in</a> as admin to manage them.
          </p>
        )}
        {token && !isAdmin && (
          <p className="text-center">
            Logged in as regular user. You can view projects only.
          </p>
        )}

        {/* Admin form */}
        {token && isAdmin && (
          <div className="card bg-dark p-4 mb-4">
            <h4 className="mb-3">
              {editingId ? "Edit Project" : "Add New Project"}
            </h4>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Client</label>
                <input
                  className="form-control"
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>New</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Budget</label>
                <input
                  type="number"
                  className="form-control"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Update" : "Save"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Project list */}
        <div className="card bg-dark p-4">
          <h4 className="mb-3">Project List</h4>
          {projects.length === 0 ? (
            <p>No projects yet.</p>
          ) : (
            <table className="table table-dark table-striped align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Start</th>
                  <th>End</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.client}</td>
                    <td>{p.status}</td>
                    <td>{p.budget}</td>
                    <td>
                      {p.startDate
                        ? new Date(p.startDate).toLocaleDateString()
                        : ""}
                    </td>
                    <td>
                      {p.endDate
                        ? new Date(p.endDate).toLocaleDateString()
                        : ""}
                    </td>
                    {isAdmin && (
                      <td>
                        <button
                          className="btn btn-sm btn-outline-light me-2"
                          onClick={() => handleEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(p._id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
