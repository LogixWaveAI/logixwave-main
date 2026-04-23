const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// updateProject import karna mat bhulna
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type! Only images and videos are allowed."),
      false,
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

router
  .route("/")
  .get(getProjects)
  .post(
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "gallery", maxCount: 5 },
    ]),
    createProject,
  );

router
  .route("/:id")
  .get(getProjectById)
  // --- UPDATE ROUTE (PUT) ---
  .put(
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "gallery", maxCount: 5 },
    ]),
    updateProject,
  )
  .delete(deleteProject);

module.exports = router;
