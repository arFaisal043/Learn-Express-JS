async function post(req, res) {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
        message: "Unauthorized"
    })
  }

  res.send("Post created successfully");
}



module.exports = { post };