import { DataTypes } from "sequelize";
import { DbConnector } from "../config/db";

const KeyStats = DbConnector.getClient().define(
  "KeyStats",
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
    minutes_played: {
      type: DataTypes.NUMBER,
    },
    match_played: {
      type: DataTypes.NUMBER,
    },
    goals: {
      type: DataTypes.NUMBER,
    },
    assists: {
      type: DataTypes.NUMBER,
    },
    distance_covered: {
      type: DataTypes.NUMBER,
    },
  },
  {}
);

export default KeyStats;
