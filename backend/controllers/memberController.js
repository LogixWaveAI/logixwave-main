const Member = require('../models/Member');

const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ order: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMember = async (req, res) => {
  try {
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}/`;

    let imageUrl = '';
    let resumeUrl = '';

    if (req.files && req.files.image) {
      imageUrl = baseUrl + req.files.image[0].path.replace(/\\/g, "/");
    }
    
    if (req.files && req.files.resume) {
      resumeUrl = baseUrl + req.files.resume[0].path.replace(/\\/g, "/");
    }

    const newMember = new Member({
      ...req.body,
      image: imageUrl,
      resume: resumeUrl
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --- NEW: Update Function ---
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}/`;

    // Purana member dhundo
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Update basic fields
    member.name = req.body.name || member.name;
    member.role = req.body.role || member.role;
    member.desc = req.body.desc || member.desc;
    member.github = req.body.github || member.github;
    member.linkedin = req.body.linkedin || member.linkedin;
    member.colorTheme = req.body.colorTheme || member.colorTheme;

    // Check agar NEW Image upload hui hai
    if (req.files && req.files.image) {
       member.image = baseUrl + req.files.image[0].path.replace(/\\/g, "/");
    }

    // Check agar NEW Resume upload hua hai
    if (req.files && req.files.resume) {
       member.resume = baseUrl + req.files.resume[0].path.replace(/\\/g, "/");
    }

    const updatedMember = await member.save();
    res.json(updatedMember);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (member) {
      await member.deleteOne();
      res.json({ message: 'Member removed' });
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export mein updateMember add karna mat bhulna
module.exports = { getMembers, createMember, updateMember, deleteMember };