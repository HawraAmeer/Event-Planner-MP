const express = require("express");

const {
  eventsList,
  eventDetails,
  createEvent,
  eventUpdate,
  fullyBookedEvents,
  listAll,
  deleteEvent,
} = require("../controllers/eventsController");

const router = express.Router();

router.get("/", eventsList);

router.get("/all", listAll);

router.post("/", createEvent);

router.get("/fullyBooked", fullyBookedEvents);

router.get("/:eventId", eventDetails);

router.put("/:eventId", eventUpdate);

router.delete("/:eventId", deleteEvent);

module.exports = router;
