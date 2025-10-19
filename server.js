
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const { tokenValidation } = require("./middlewares/authMiddleware");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb://127.0.0.1:27017/cadastro")
  .then(() => console.log(" MongoDB conectado"))
  .catch(err => console.error(" Erro ao conectar ao MongoDB:", err));


app.use("/api", authRoutes);
app.use("/api", eventRoutes);


app.get("/api/perfil", tokenValidation, (req, res) => {
  res.json({ mensagem: `Bem-vindo, ${req.user.email}!` });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});