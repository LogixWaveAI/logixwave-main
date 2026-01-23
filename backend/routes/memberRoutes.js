const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// updateMember import kiya
const { getMembers, createMember, updateMember, deleteMember } = require('../controllers/memberController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.route('/').get(getMembers);

router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), createMember);

// --- UPDATE ROUTE (PUT) ---
// Yahan bhi upload.fields chahiye kyunki edit karte waqt bhi file upload ho sakti hai
router.route('/:id')
  .put(upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'resume', maxCount: 1 }
  ]), updateMember)
  .delete(deleteMember);

module.exports = router;