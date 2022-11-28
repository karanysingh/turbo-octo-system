import { DataTypes } from "sequelize";
import { DbConnector } from "../config/db";

const Key_stats = DbConnector.getClient().define(
  "Key_stats",
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
  {
    freezeTableName: true,
  }
);

export default Key_stats;
