const express = require("express");
const studentController = require("../controllers/studentsController");
const router = express.Router();
const isAuthenticated = require("../middleware/authenticate.js");


router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getSingleStudent);
router.post("/", isAuthenticated, studentController.createStudent);
router.put("/:id", isAuthenticated, studentController.updateStudent);
router.delete("/:id", isAuthenticated, studentController.deleteStudent);


module.exports = router;