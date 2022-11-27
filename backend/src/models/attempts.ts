import { DataTypes } from "sequelize";
import { DbConnector } from "../config/db";

const Attempts = DbConnector.getClient().define(
  "Attempts",
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
    total_attempts: {
      type: DataTypes.NUMBER,
    },
    on_target: {
      type: DataTypes.NUMBER,
    },
    off_target: {
      type: DataTypes.NUMBER,
    },
    blocked: {
      type: DataTypes.NUMBER,
    },
    match_played: {
      type: DataTypes.NUMBER,
    },
  },
  {}
);

export default Defending;
