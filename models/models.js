const mongoose = require("mongoose");
const ObjID = mongoose.Schema.Types.ObjectId;

const questions = new mongoose.Schema({
  questionText: { type: String, required: true },
  category: { type: String, required: true },
  qIndex: {type: Number, required: true},
  terminate: { type: Boolean, required: true, default: false },
  terminateChoice: [{ type: Number, required: false }]
});

const surveys = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [{ type: ObjID, ref: "Questions" }]
});

const answers = new mongoose.Schema({
  questionID: { type: ObjID, ref: "Questions", required: true },
  surveyID: { type: ObjID, ref: "Surveys", required: true },
  category: {type: String, required: true},
  choice: { type: Number, required: true }
});

module.exports = {
  Questions: mongoose.model("Questions", questions),
  Surveys: mongoose.model("Surveys", surveys),
  Answers: mongoose.model("Answers", answers)
};
