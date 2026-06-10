const express = require("express");
const lessonsController = require("../controllers/lessonsController");
const router = express.Router();

const getAllLessons = async (res, req) => {
    console.log("Controller reached")
}

router.get("/", lessonsController.getAllLessons);
router.get("/:id", lessonsController.getSingleLesson);
router.post("/", lessonsController.createLesson);
router.put("/:id", lessonsController.updateLesson);
router.delete("/:id", lessonsController.deleteLesson);



module.exports = router;