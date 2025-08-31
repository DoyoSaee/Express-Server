const path = require("path");

function getPost(req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "images", "1.jpg"));
}

module.exports = {
  getPost,
};
