//////Variables Used throughout//////
var surveyName = "";
var questionList = [];

////create new survey
$("#survey-button").on("click", function() {
  event.preventDefault();
  surveyName = $("#survey")
    .val()
    .trim();
});
////adding new question to the question array/////
$("#question-button").on("click", function() {
  event.preventDefault();
  c = $("#cat")
    .val()
    .trim();
  q = $("#question")
    .val()
    .trim();
  i = questionList.length;

  questionList.push({ questionText: q, category: c, qIndex: i });
  console.log({ name: surveyName, questions: questionList })
});

$("#save-button").on("click", () => {
  console.log({ name: surveyName, questions: questionList })
  $.post("/api/addSurvey", { name: surveyName, questions: questionList });
});

$("#empty-button").on("click", () => {
  $.post("/api/empty");
});
