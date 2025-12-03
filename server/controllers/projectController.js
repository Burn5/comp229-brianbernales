const Project = require("../models/Project");

// GET all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create project
exports.createProject = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;

    if (!title || !firstname || !lastname || !email || !completion || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProject = new Project({
      title,
      firstname,
      lastname,
      email,
      completion,
      description
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// PUT update project
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE one project
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE all projects
exports.deleteAllProjects = async (req, res) => {
  try {
    await Project.deleteMany();
    res.json({ message: "All projects deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
