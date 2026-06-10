const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../data/database.js");


//Function to get all lessons
const getAllLessons = async (req, res) => {
  //#swagger.tags=["Lessons"]
  try {
    const result = mongodb.getDatabase().collection("lessons").find();
    const lessons = await result.toArray();
    res.status(200).json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the lesson",
    });
  }
};

//Function to retrieve single lesson
const getSingleLesson = async (req, res) => {
  //#swagger.tags=["Lessons"]
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid lesson ID" });
    }
    const lessonId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("lessons")
      .findOne({ _id: lessonId });
    if (!result) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the lesson",
    });
  }
};

//create lesson function
const createLesson = async (req, res) => {
  //#swagger.tags=["Lessons"]
  try {
    if (
      !req.body.title ||
      !req.body.courseId ||
      !req.body.lessonNumber ||
      !req.body.durationMinutes ||
      !req.body.topic
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    const createALesson = {
      title: req.body.title,
      courseId: req.body.courseId,
      lessonNumber: req.body.lessonNumber,
      durationMinutes: req.body.durationMinutes,
      topic: req.body.topic,
    };
    const result = await mongodb
      .getDatabase()
      .collection("lessons")
      .insertOne(createALesson);
    if (!result.acknowledged) {
      return res.status(500).json({ message: "lesson could not be created!" });
    }
    res.status(201).send("lesson created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Some error occurred while creating lesson",
    });
  }
};

//Function to update lesson
const updateLesson = async (req, res) => {
  //#swagger.tags=["Lessons"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }
    const lessonId = new ObjectId(req.params.id);
    const lesson = {
      title: req.body.title,
      courseId: req.body.courseId,
      lessonNumber: req.body.lessonNumber,
      durationMinutes: req.body.durationMinutes,
      topic: req.body.topic,
    };
    const response = await mongodb
      .getDatabase()
      .collection("lessons")
      .replaceOne({ _id: lessonId }, lesson);

    if (response.matchedCount === 0) {
      res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json({ message: "Lesson updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Server error");
  }
};

//Function to delete lesson
const deleteLesson = async (req, res) => {
  //#swagger.tags=["Lessons"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }
    const lessonId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection("lessons")
      .deleteOne({ _id: lessonId });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).send("Lesson deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Something went wrong during deletion",
    });
  }
};

module.exports = {
  getAllLessons,
  getSingleLesson,
  createLesson,
  updateLesson,
  deleteLesson,
};
