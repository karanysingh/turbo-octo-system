import { DataTypes } from "sequelize";
import { DbConnector } from "../config/db";

const Goals = DbConnector.getClient().define(
  "Goals",
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
    goals: {
      type: DataTypes.NUMBER,
    },
    right_foot: {
      type: DataTypes.NUMBER,
    },
    left_foot: {
      type: DataTypes.NUMBER,
    },
    headers: {
      type: DataTypes.NUMBER,
    },
    others: {
      type: DataTypes.NUMBER,
    },
    inside_area: {
      type: DataTypes.NUMBER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Goals;
