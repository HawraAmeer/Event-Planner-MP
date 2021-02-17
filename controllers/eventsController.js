const { Event } = require("../db/models");
const { Op } = require("sequelize");

exports.listAll = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [["startDate", "ASC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventsList = async (req, res) => {
  try {
    if (req.body.date) {
      const events = await Event.findAll({
        where: { startDate: { [Op.gt]: req.body.date } },
        order: [["startDate", "ASC"]],
        attributes: {
          exclude: [
            "organizer",
            "email",
            "numOfSeats",
            "bookedSeats",
            "startDate",
            "endDate",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      res.json(events);
    } else {
      const events = await Event.findAll({
        order: [["startDate", "ASC"]],
        attributes: {
          exclude: [
            "organizer",
            "email",
            "numOfSeats",
            "bookedSeats",
            "startDate",
            "endDate",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      res.json(events);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDetails = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      res.json(foundEvent);
    } else res.status(404).json({ message: "Event not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    if (req.body.length) {
      const events = await Event.bulkCreate(req.body);
      res.status(201).json(events);
    } else {
      const newEvent = await Event.create(req.body);
      res.status(201).json(newEvent);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventUpdate = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      await foundEvent.update(req.body);
      res.status(204).end();
    } else res.status(404).json({ message: "Event not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  //   try {
  //     if (req.body) {
  //       const events = await Event.bulkCreate(req.body);
  //       res.status(201).json({ message: events });
  //     } else {
  //       const newEvent = await Event.create(req.body);
  //       res.status(201).json(newEvent);
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  try {
    const eventsId = req.params.eventId.split("-");
    const foundEvents = await Event.findAll({ where: { id: eventsId } });
    if (foundEvents) {
      await Event.destroy({ where: { id: eventsId } });
      res.status(204).end();
    } else res.status(404).json({ message: "Event was not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fullyBookedEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { bookedSeats: { [Op.col]: "Event.numOfSeats" } },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
