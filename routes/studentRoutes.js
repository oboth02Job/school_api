const express = require("express");
const studentController = require("../controllers/studentsController");
const router = express.Router();


router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getSingleStudent);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);


module.exports = router;