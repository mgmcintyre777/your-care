const contentDiv = $("#page-section");
const surveyListDiv = $("#survey-list-div");
const surveyList = $("#survey-list");

$(document).ready(() => {
  surveyListDiv.hide();
  $.getJSON("/api/getSurveys", data => {
    loadSurveyList(data);
  });
});

function loadSurveyList(data) {
  data.forEach(survey => {
    let listItem = $("<li>")
      .attr({ sid: survey._id })
      .html(survey.name)
      .on("click", function(e) {
        console.log("redirect:", $(this).attr("sid"))
        //loadSurvey($(this).attr("sid"));
      });
    surveyList.append(listItem);
  });
  surveyListDiv.show();
}