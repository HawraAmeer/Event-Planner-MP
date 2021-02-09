module.exports = (sequelize, DataTypes) =>
  sequelize.define("Event", {
    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        stringLength(value) {
          if (value.length > 20) {
            throw new Error("Organizer name must be less than 20 characters");
          }
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notContains: "event" },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    numOfSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },
    bookedSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max(value) {
          if (value > this.numOfSeats) {
            throw new Error("Booked Seats must be <= # of Seats");
          }
        },
      },
    },
    startDate: {
      type: DataTypes.STRING,
      validate: {
        validation(value) {
          if (this.endDate && !value) {
            throw new Error("There must be a Start Date");
          }
        },
        isAfter: "2021-02-09",
      },
    },
    endDate: {
      type: DataTypes.STRING,
      validate: {
        validation(value) {
          if (this.startDate && !value) {
            throw new Error("There must be an End Date");
          }
          if (value < this.startDate) {
            throw new Error("End date must be after startDate");
          }
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true },
    },
  });
