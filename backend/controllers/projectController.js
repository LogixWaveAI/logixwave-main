const Project = require('../models/Project');

// @desc    Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}/`;

    let thumbnailUrl = '';
    if (req.files && req.files.thumbnail) {
        thumbnailUrl = baseUrl + req.files.thumbnail[0].path.replace(/\\/g, "/");
    }

    let mediaArray = [];
    if (req.files && req.files.gallery) {
        mediaArray = req.files.gallery.map(file => ({
            url: baseUrl + file.path.replace(/\\/g, "/"),
            type: file.mimetype.startsWith('video') ? 'video' : 'image'
        }));
    }

    const techStackArray = req.body.techStack ? req.body.techStack.split(',').map(item => item.trim()).filter(i => i) : [];
    const featuresArray = req.body.features ? req.body.features.split('\n').map(item => item.trim()).filter(i => i) : [];
    
    let statsArray = [];
    if(req.body.stats) {
        statsArray = req.body.stats.split('\n').map(line => {
            const [label, value] = line.split(':');
            return (label && value) ? { label: label.trim(), value: value.trim() } : null;
        }).filter(i => i !== null);
    }

    const projectData = {
      ...req.body,
      thumbnail: thumbnailUrl,
      image: thumbnailUrl,
      heroImage: thumbnailUrl,
      media: mediaArray,
      techStack: techStackArray,
      features: featuresArray,
      stats: statsArray
    };

    const project = new Project(projectData);
    const createdProject = await project.save();
    res.status(201).json(createdProject);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// --- NEW: Update Project Function ---
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}/`;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // 1. Update Basic Fields
    const fields = ['title', 'category', 'description', 'github', 'live', 'client', 'duration', 'role', 'challenge', 'solution', 'codeSnippet'];
    fields.forEach(field => {
        if (req.body[field] !== undefined) project[field] = req.body[field];
    });

    // 2. Update Arrays (Convert strings back to arrays)
    if (req.body.techStack) {
        project.techStack = req.body.techStack.split(',').map(item => item.trim()).filter(i => i);
    }
    if (req.body.features) {
        project.features = req.body.features.split('\n').map(item => item.trim()).filter(i => i);
    }
    if (req.body.stats) {
        project.stats = req.body.stats.split('\n').map(line => {
            const [label, value] = line.split(':');
            return (label && value) ? { label: label.trim(), value: value.trim() } : null;
        }).filter(i => i !== null);
    }

    // 3. Handle Thumbnail Update
    if (req.files && req.files.thumbnail) {
        const newThumbnail = baseUrl + req.files.thumbnail[0].path.replace(/\\/g, "/");
        project.thumbnail = newThumbnail;
        project.image = newThumbnail; // Legacy update
        project.heroImage = newThumbnail; // Legacy update
    }

    // 4. Handle Gallery (Append New Files)
    // Note: Is logic se purane files delete nahi honge, naye add ho jayenge.
    if (req.files && req.files.gallery) {
        const newMedia = req.files.gallery.map(file => ({
            url: baseUrl + file.path.replace(/\\/g, "/"),
            type: file.mimetype.startsWith('video') ? 'video' : 'image'
        }));
        project.media.push(...newMedia);
    }

    const updatedProject = await project.save();
    res.json(updatedProject);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };