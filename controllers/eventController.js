const Event = require("../models/Event");


const createEvent = async (req, res) => {
  const { title, date, description } = req.body;
  if (!title || !date) {
    return res.status(400).json({ error: "Título e data são obrigatórios" });
  }
  try {
    const event = await Event.create({ title, date, description });
    res.status(201).json(event);
  } catch (err) {
    console.error("Erro ao criar evento:", err.message);
    res.status(500).json({ error: "Erro ao criar evento", details: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar eventos" });
  }
};

const addParticipant = async (req, res) => {
  const { id } = req.params;
  const { participant } = req.body;

  if (!participant) {
    return res.status(400).json({ error: "Nome/email do participante é obrigatório" });
  }

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    event.participants.push(participant);
    await event.save();

    res.json({ message: "Participante adicionado com sucesso", event });
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar participante" });
  }
};

const getParticipants = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }
    res.json({ participants: event.participants });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar participantes" });
  }
};

module.exports = { createEvent, getEvents, addParticipant, getParticipants };
