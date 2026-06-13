const express = require("express");
const lessonsController = require("../controllers/lessonsController");
const router = express.Router();
const isAuthenticated = require("../middleware/authenticate.js");

const getAllLessons = async (res, req) => {
    console.log("Controller reached")
}

router.get("/", lessonsController.getAllLessons);
router.get("/:id", lessonsController.getSingleLesson);
router.post("/", isAuthenticated, lessonsController.createLesson);
router.put("/:id", isAuthenticated, lessonsController.updateLesson);
router.delete("/:id", isAuthenticated, lessonsController.deleteLesson);



module.exports = router;