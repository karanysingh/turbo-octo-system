import { DataTypes } from "sequelize";
import { DbConnector } from "../config/db";

const Disciplinary = DbConnector.getClient().define(
  "Disciplinary",
  {
    player_id: {
      type: DataTypes.BIGINT,
    },
    club: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    fouls_committed: {
      type: DataTypes.NUMBER,
    },
    fouls_suffered: {
      type: DataTypes.NUMBER,
    },
    red: {
      type: DataTypes.NUMBER,
    },
    yellow: {
      type: DataTypes.NUMBER,
    },
    minutes_played: {
      type: DataTypes.NUMBER,
    },
    match_played: {
      type: DataTypes.NUMBER,
    },
  },
  {}
);

export default Disciplinary;
