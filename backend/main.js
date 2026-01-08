
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

/* ===============================
   🔒 FUNÇÃO DE TRAVA (AQUI)
   Fica ANTES do app e da rota
   =============================== */
function clampReply(text) {
  if (!text) return "[ERROR] Resposta vazia";

  let output = text.split(/[\n.!?]/)[0];

  const words = output.trim().split(/\s+/);
  if (words.length > 12) {
    output = words.slice(0, 12).join(" ");
  }

  if (output.length > 120) {
    output = output.slice(0, 120);
  }

  return output;
}

/* ===============================
   CONFIGURAÇÃO DO SERVIDOR
   =============================== */
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* ===============================
   ROTA /chat (AQUI USA A TRAVA)
   =============================== */
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: [
        {
          role: "system",
          content: `
Você é um sistema operacional experimental que interpreta falhas humanas
como logs técnicos, irônicos e não determinísticos.

Regras:
- Responda sempre como um log de sistema
- Use linguagem técnica e metafórica
- Não dê conselhos diretos
- Não seja gentil, seja preciso
- Nunca diga que é uma IA ou assistente
- Mantenha um tom sarcástico e seco
- Use níveis de log: INFO, WARN, ERROR
- Máximo de 1 frase
- Entre 6 e 18 palavras
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    /* ===== RESPOSTA BRUTA DA IA ===== */
    const reply =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "[ERROR] Resposta não interpretável";

    /* ===== APLICA A TRAVA AQUI ===== */
    const finalReply = clampReply(reply);

console.log("", reply);
console.log("IA:", finalReply);
res.json({ reply: finalReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao falar com a IA" });
  }
});

/* ===============================
   INICIA O SERVIDOR
   =============================== */
app.listen(3000, () => {
  console.log("🔥 API rodando em http://localhost:3000");
});
