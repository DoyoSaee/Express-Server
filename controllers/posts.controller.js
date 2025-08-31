const path = require("path");

function getPost(req, res) {
  res.render("posts", {
    templateName: "posts",
    title: "포스트",
  });
}

module.exports = {
  getPost,
};
