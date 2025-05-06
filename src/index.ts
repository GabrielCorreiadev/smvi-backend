import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Node rodando com sucesso 🚀");
});

app.get("/denuncias", (req, res) => {
  const sql = "SELECT * FROM denuncias";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao buscar denúncias" });
    }
    res.json(result);
  });
});

app.post("/denuncias", (req, res) => {
  const {
    nomeVitima,
    idade,
    bairro,
    tipo,
    nomeAgressor,
    sexoAgressor,
    data,
    grauDenuncia,
  } = req.body;

  const sql = `
    INSERT INTO denuncias 
    (nomeVitima, idade, bairro, tipo, nomeAgressor, sexoAgressor, data, grauDenuncia) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nomeVitima,
    idade,
    bairro,
    tipo,
    nomeAgressor,
    sexoAgressor,
    data,
    grauDenuncia,
  ];

  db.query(sql, values, (err) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao registrar denúncia" });
    }
    res.status(201).json({ mensagem: "Denúncia registrada com sucesso!" });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
