const ObjectId = require("mongodb").ObjectId;
const database = require("../data/database.js");
const mongodb = require("../data/database.js");

//Function to get all students
const getAllStudents = async (req, res) => {
  //#swagger.tags=["students"]
  try {
    const result = mongodb.getDatabase().collection("students").find();
    const students = await result.toArray();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the student",
    });
  }
};

//Function to retrieve single student
const getSingleStudent = async (req, res) => {
  //#swagger.tags=["students"]
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid student ID" });
    }
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("students")
      .findOne({ _id: studentId });
    if (!result) {
      return res.status(404).json({ message: "student not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the student",
    });
  }
};

//create student function
const createStudent = async (req, res) => {
  //#swagger.tags=["students"]
  try {
    if (
      !req.body.destinationId ||
      !req.body.travelDate ||
      !req.body.numberOfPeople
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    const createAstudent = {
      destinationId: req.body.destinationId,
      travelDate: req.body.travelDate,
      numberOfPeople: req.body.numberOfPeople,
    };
    const result = await mongodb
      .getDatabase()
      .collection("students")
      .insertOne(createAstudent);
    if (!result.acknowledged) {
      return res.status(500).json({ message: "student could not be created!" });
    }
    res.status(201).send("student created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Some error occurred while creating student",
    });
  }
};

//Function to update student
const updateStudent = async (req, res) => {
  //#swagger.tags=["students"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    const studentId = new ObjectId(req.params.id);
    const student = {
      destinationId: req.body.destinationId,
      travelDate: req.body.travelDate,
      numberOfPeople: req.body.numberOfPeople,
    };
    const response = await mongodb
      .getDatabase()
      .collection("students")
      .replaceOne({ _id: studentId }, student);

    if (response.matchedCount === 0) {
      res.status(404).json({ message: "student not found" });
    }
    res.status(200).json({ message: "student updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Server error");
  }
};

//Function to delete student
const deleteStudent = async (req, res) => {
  //#swagger.tags=["students"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    const studentId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection("students")
      .deleteOne({ _id: studentId });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).send("Student deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Something went wrong during deletion",
    });
  }
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
