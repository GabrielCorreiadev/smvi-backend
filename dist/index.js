"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_js_1 = require("./db.js");
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Servidor Node rodando com sucesso 🚀");
});
app.get("/denuncias", (req, res) => {
    const sql = "SELECT * FROM denuncias";
    db_js_1.db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar denúncias" });
        }
        res.json(result);
    });
});
app.post("/denuncias", (req, res) => {
    const { nomeVitima, idade, bairro, tipo, nomeAgressor, sexoAgressor, data, grauDenuncia, } = req.body;
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
    db_js_1.db.query(sql, values, (err) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao registrar denúncia" });
        }
        res.status(201).json({ mensagem: "Denúncia registrada com sucesso!" });
    });
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
