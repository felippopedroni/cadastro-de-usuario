const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { tokenValidation } = require("../middlewares/authMiddleware");

router.post("/events", tokenValidation, eventController.createEvent);

router.get("/events", tokenValidation, eventController.getEvents);

router.post("/events/:id/participants", tokenValidation, eventController.addParticipant);

router.get("/events/:id/participants", tokenValidation, eventController.getParticipants);

module.exports = router;
