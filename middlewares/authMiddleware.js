const jwt = require("jsonwebtoken");

const tokenValidation = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Acesso negado. Token ausente ou mal formatado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, "secreta"); 
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Token inválido" });
  }
};

module.exports = {
  tokenValidation,
};
