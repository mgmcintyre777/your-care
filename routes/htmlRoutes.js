const path = require("path");

module.exports = function(app) {
  app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/seed_old.html"));
  });

  app.get("/reports", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/reports.html"));
  });

  app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey_old.html"));
  });

  app.get("/survey_old", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("/seed", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/seed.html"));
  });

  app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
