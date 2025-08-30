function getPost(req, res) {
  res.send(`
    <div>
      <h1>
        <p>POST통신</p>
      </h1>
    </div>
  `);
}

module.exports = {
  getPost,
};
