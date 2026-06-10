const express = require("express");
const coursesController = require("../controllers/coursesController");
const router = express.Router();


router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getSingleCourse);
router.post("/", coursesController.createCourse);
router.put("/:id", coursesController.updateCourse);
router.delete("/:id", coursesController.deleteCourse);


module.exports = router