import { DataTypes } from "sequelize";
import { DbConnector } from "../config/db";

const Defending = DbConnector.getClient().define(
  "Defending",
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
    balls_recoverd: {
      type: DataTypes.NUMBER,
    },
    tackles: {
      type: DataTypes.NUMBER,
    },
    t_won: {
      type: DataTypes.NUMBER,
    },
    t_lost: {
      type: DataTypes.NUMBER,
    },
    clearance_attempted: {
      type: DataTypes.NUMBER,
    },
    match_played: {
      type: DataTypes.NUMBER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Defending;
