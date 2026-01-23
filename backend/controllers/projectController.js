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

    // 1. THUMBNAIL LOGIC
    // Pehle check karein agar User ne Direct Link diya hai (Best for Render)
    let finalThumbnail = req.body.thumbnailUrl || '';

    // Agar file upload ki hai (Temporary on Render), to use override karein
    if (req.files && req.files.thumbnail) {
        finalThumbnail = baseUrl + req.files.thumbnail[0].path.replace(/\\/g, "/");
    }

    // 2. GALLERY LOGIC
    let mediaArray = [];
    
    // (A) Agar Links diye hain (Comma separated)
    if (req.body.galleryUrls) {
        const urls = req.body.galleryUrls.split(',').map(url => url.trim()).filter(u => u);
        const urlObjects = urls.map(url => ({
            url: url,
            type: 'image' // Default to image
        }));
        mediaArray = [...mediaArray, ...urlObjects];
    }

    // (B) Agar Files upload ki hain
    if (req.files && req.files.gallery) {
        const fileObjects = req.files.gallery.map(file => ({
            url: baseUrl + file.path.replace(/\\/g, "/"),
            type: file.mimetype.startsWith('video') ? 'video' : 'image'
        }));
        mediaArray = [...mediaArray, ...fileObjects];
    }

    const project = new Project({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      github: req.body.github,
      live: req.body.live,
      client: req.body.client,
      duration: req.body.duration,
      role: req.body.role,
      techStack: req.body.techStack ? JSON.parse(req.body.techStack) : [],
      features: req.body.features ? JSON.parse(req.body.features) : [],
      stats: req.body.stats ? JSON.parse(req.body.stats) : [],
      challenge: req.body.challenge,
      solution: req.body.solution,
      codeSnippet: req.body.codeSnippet,
      thumbnail: finalThumbnail,
      image: finalThumbnail,       // Legacy support
      heroImage: finalThumbnail,   // Legacy support
      media: mediaArray
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
        project.title = req.body.title || project.title;
        project.category = req.body.category || project.category;
        project.description = req.body.description || project.description;
        project.github = req.body.github || project.github;
        project.live = req.body.live || project.live;
        project.client = req.body.client || project.client;
        project.duration = req.body.duration || project.duration;
        project.role = req.body.role || project.role;
        project.challenge = req.body.challenge || project.challenge;
        project.solution = req.body.solution || project.solution;
        project.codeSnippet = req.body.codeSnippet || project.codeSnippet;

        if (req.body.techStack) project.techStack = JSON.parse(req.body.techStack);
        if (req.body.features) project.features = JSON.parse(req.body.features);
        if (req.body.stats) project.stats = JSON.parse(req.body.stats);

        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}/`;

        // --- 1. Update Thumbnail ---
        // Agar URL diya hai to set karein
        if (req.body.thumbnailUrl) {
            project.thumbnail = req.body.thumbnailUrl;
            project.image = req.body.thumbnailUrl;
            project.heroImage = req.body.thumbnailUrl;
        }
        // Agar File di hai to overwrite karein
        if (req.files && req.files.thumbnail) {
            const newThumbnail = baseUrl + req.files.thumbnail[0].path.replace(/\\/g, "/");
            project.thumbnail = newThumbnail;
            project.image = newThumbnail;
            project.heroImage = newThumbnail;
        }

        // --- 2. Update Gallery ---
        // Add new URLs
        if (req.body.galleryUrls) {
            const urls = req.body.galleryUrls.split(',').map(url => url.trim()).filter(u => u);
            const urlObjects = urls.map(url => ({
                url: url,
                type: 'image'
            }));
            project.media.push(...urlObjects);
        }
        // Add new Files
        if (req.files && req.files.gallery) {
            const newMedia = req.files.gallery.map(file => ({
                url: baseUrl + file.path.replace(/\\/g, "/"),
                type: file.mimetype.startsWith('video') ? 'video' : 'image'
            }));
            project.media.push(...newMedia);
        }

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
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