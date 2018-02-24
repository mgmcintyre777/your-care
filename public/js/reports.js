const surveyListDiv = $("#survey-list-div");
const surveyList = $("#survey-list");
const reportsDiv = $("#reports-div");

var answersJson, name;

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
        loadSurvey($(this).attr("sid"));
      });
    surveyList.append(listItem);
  });
  surveyListDiv.show();
}

function loadSurvey(id) {
  $.getJSON("/api/getAnswers/" + id, surveyData => {
    surveyList.hide();
    let labels = surveyData.map(d => d._id.cat);
    let data = surveyData.map(d => d.avg);
    console.log(answersJson);
    createChart(data, labels);
  });
}

function createChart(sData, sLabels) {
  var barchart = new Chart(document.getElementById("myChart"), {
    type: "bar",
    data: {
      labels: sLabels,
      datasets: [
        {
          label: "Avg. Rating",
          data: sData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
  console.log(barchart);
}
