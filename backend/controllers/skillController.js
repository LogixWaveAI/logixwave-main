const Skill = require('../models/Skill');

// @desc    Get all skills, optionally filtered by owner
// @route   GET /api/skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ owner: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new skill
// @route   POST /api/skills
const createSkill = async (req, res) => {
  const { name, icon, status, color, from, to, owner } = req.body;

  if (!name || !icon || !status || !color || !from || !to || !owner) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  try {
    const newSkill = new Skill({
      name,
      icon,
      status,
      color,
      from,
      to,
      owner,
    });

    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      await skill.deleteOne();
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSkills, createSkill, deleteSkill };