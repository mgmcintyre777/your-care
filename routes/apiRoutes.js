const db = require("../models/models.js");
var mongoose = require("mongoose");

module.exports = function(app) {
  app.post("/api/addAnswer/", (req, res) => {
    let theAnswer = new db.Answers(req.body);
    theAnswer.save();
    res.json(req.body);
  });

  app.post("/api/addSurvey", (req, res) => {
    let questionArray = [];
    let surveyObj = req.body;
    surveyObj.questions.forEach(q => {
      let newQuestion = new db.Questions(q);
      questionArray.push(newQuestion._id);
      newQuestion.save();
    });
    let theSurvey = new db.Surveys({
      name: surveyObj.name,
      questions: questionArray
    });
    theSurvey.save();
    res.json(req.body);
  });

  app.post("/api/empty", (req, res) => {
    for (model in db) {
      db[model].remove({}).catch(err => {
        res.json(err);
      });
    }
  });

  app.get("/api/getAnswers/:surveyId", (req, res) => {
    console.log(req.params.surveyId);
    db.Answers.aggregate([
      {
        $match: {
          surveyID: mongoose.Types.ObjectId(req.params.surveyId)
        }
      },
      {
        $group: {
          _id: { cat: "$category" },
          avg: { $avg: "$choice" },
          cnt: { $sum: 1 }
        }
      }
    ])
      .then(docs => res.json(docs))
      .catch(err => res.json(err));
  });

  app.get("/api/getSurvey/:surveyId", (req, res) => {
    db.Surveys.findById(req.params.surveyId)
      .populate("questions")
      .then(doc => res.json(doc))
      .catch(err => res.json(err));
  });

  app.get("/api/getSurveys", (req, res) => {
    db.Surveys.find({}, "name")
      .then(docs => res.json(docs))
      .catch(err => res.json(err));
  });
};
