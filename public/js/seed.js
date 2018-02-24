//////Variables Used throughout//////
var surveyName = "";
var questionList = [];
var surveyButton = false;

$(document).ready(() => {
  $("#saveBtn").on("click", function(e) {
    console.log({ name: surveyName, questions: questionList });
    event.preventDefault();
    $.post("/api/addSurvey", { name: surveyName, questions: questionList });
    document.getElementById("clear").reset();
    $("#saveBtn").hide();
    $("#add").hide();
    questionList = [];
    surveyButton = false;
    $("currentSurvey").html("New Survey");
    $("#questionList").innerHTML("");
  });
  $("#add").on("click", function(e) {
    addQ(e);
  });
  $("#saveBtn").hide();
  $("#add").hide();
});

var newForm =
  '<div class="form-group">' +
  '<label for="cat">Category:</label>' +
  '<input type="text" id="cat" name="category">' +
  "</div>" +
  '<div class="form-group">' +
  '<label for="cat">New Question</label>' +
  '<textarea class="form-control" id="addQuestion" rows="3" name="questionText"></textarea>' +
  "</div>";

////create new survey
$("#newSurvey").on("click", function() {
  event.preventDefault();
  surveyName = $("#surveyName")
    .val()
    .trim();
  document.getElementById("currentSurvey").innerHTML = surveyName;
  document.getElementById("clear").innerHTML = newForm;
  $("#add").show();
  console.log(surveyName);
});

////adding new question to the question array/////
function addQ(event) {
  event.preventDefault();
  c = $("#cat")
    .val()
    .trim();
  q = $("#addQuestion")
    .val()
    .trim();
  i = questionList.length;
  questionList.push({ questionText: q, category: c, qIndex: i });
  $("#questionList").append(
    '<li class="qList">' +
      q +
      '<button type="button" class="btn btn-link qDelete">' +
      "<a><small> Delete <small></a>" +
      "</button>" +
      "</li>"
  );
  document.getElementById("clear").reset();
  console.log(questionList);
  if (surveyButton === false) {
    $("#saveBtn").show();
    surveyButton = true;
  }
  return false;
}
