const express = require("express");
const router = express.Router();
const {
  getSkills,
  createSkill,
  deleteSkill,
} = require("../controllers/skillController");
// Note: Assuming 'protect' middleware is needed for authentication
// const { protect } = require('../middleware/authMiddleware');

// /api/skills
// POST and DELETE requests will require authentication (protect middleware)
router
  .route("/")
  .get(getSkills)
  // Assuming 'protect' middleware is used here
  .post(createSkill);

router
  .route("/:id")
  // Assuming 'protect' middleware is used here
  .delete(deleteSkill);

module.exports = router;
