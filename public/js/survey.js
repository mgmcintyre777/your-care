const surveyListDiv = $("#survey-list-div");
const buttonDiv = $("#buttons-div");
const surveyQuestion = $("#survey-question");
var questionIndex, surveyLength, surveyJson;

$(document).ready(() => {
  buttonDiv.hide();
  $.getJSON("/api/getSurveys", data => {
    loadSurveyList(data);
  });
});

function restartSurvey() {
  console.log("restart survey");
  questionIndex = 0;
  let qtxt = surveyJson.questions[questionIndex].questionText;
  surveyQuestion.html(qtxt);
  alert("Thanks!!");
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex < surveyLength) {
    let qtxt = surveyJson.questions[questionIndex].questionText;
    surveyQuestion.html(qtxt);
    console.log("current question:", questionIndex + 1);
  } else {
    restartSurvey();
  }
}

function clickFace(n) {
  let sid = surveyJson._id;
  let qid = surveyJson.questions[questionIndex]._id;
  let cat = surveyJson.questions[questionIndex].category;
  let answer = { questionID: qid, surveyID: sid, choice: n , category: cat};
  $.post("/api/addAnswer/", answer);
  nextQuestion();
}

function loadSurvey(id) {
  $.getJSON("/api/getSurvey/" + id, surveyData => {
    surveyListDiv.hide();
    questionIndex = 0;
    surveyJson = surveyData;
    surveyLength = surveyJson.questions.length;
    buttonDiv.show();
    surveyQuestion.show();
    let qtxt = surveyJson.questions[questionIndex].questionText;
    surveyQuestion.html(qtxt);
    $(".face-button").on("click", function(e) {
      clickFace($(this).attr("data-id"));
    });
  });
}

function loadSurveyList(data) {
  data.forEach(survey => {
    let listItem = $("<p>")
      .attr({class: "lead"})
      .attr({ sid: survey._id })
      .css( 'cursor', 'pointer' )
      .html(survey.name)
      .on("click", function(e) {
        loadSurvey($(this).attr("sid"));
      });
    surveyListDiv.append(listItem);
  });
}
