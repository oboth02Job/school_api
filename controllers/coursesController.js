const mongodb = require("../data/database.js");
const ObjectId = require("mongodb").ObjectId;

//Function to get all courses
const getAllCourses = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const result = mongodb.getDatabase().collection("courses").find();
    const courses = await result.toArray();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the courses",
    });
  }
};

//Function to retrieve single course
const getSingleCourse = async (req, res) => {
  //#swagger.tags=["courses"]
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid course ID" });
    } 
     const courseId = new ObjectId(req.params.id);
     const result = await mongodb
       .getDatabase()
       .collection("courses")
       .findOne({ _id: courseId },);
    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the course",
    });
  }
};

//create course function
const createCourse = async (req, res) => {
  //#swagger.tags=["courses"]
  try {
    if (
      !req.body.courseName ||
      !req.body.description ||
      !req.body.durationWeeks ||
    !req.body.level ||
    !req.body.fee
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    const createACourse = {
      courseName: req.body.courseName,
      description: req.body.description,
      durationWeeks: req.body.durationWeeks,
      level: req.body.level,
      fee: req.body.fee,
    };
    const result = await mongodb
      .getDatabase()
      .collection("courses")
      .insertOne(createACourse);
    if (!result.acknowledged) {
      return res.status(500).json({ message: "Course could not be created!" });
    }
    res.status(201).send("Course created successfully");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error.message || "Some error occurred while creating Course",
      });
  }
}
  
//Function to update course
const updateCourse = async (req, res) => {
  //#swagger.tags=["courses"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }
    const courseId = new ObjectId(req.params.id);
    const Course = {
      courseName: req.body.courseName,
      description: req.body.description,
      durationWeeks: req.body.durationWeeks,
      level: req.body.level,
      fee: req.body.fee,
    };
    const response = await mongodb
      .getDatabase()
      .collection("courses")
      .replaceOne({ _id: courseId }, Course);

    if (response.matchedCount === 0) {
      res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Server error");
  }
}
 
//Function to delete course
const deleteCourse = async (req, res) => {
  //#swagger.tags=["courses"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }
    const courseId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection("courses")
      .deleteOne({ _id: courseId });
    if (response.deletedCount === 0) {
       return res.status(404).json({ message: "Course not found" });
    }
     res.status(200).send("Course deleted");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error.message || "Something went wrong during deletion",
      });
  }
};



module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};



