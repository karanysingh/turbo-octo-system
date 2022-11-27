import { DataTypes } from "sequelize";
import { DbConnector } from "../config/db";

const Distribution = DbConnector.getClient().define(
  "Distribution",
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
    pass_accuracy: {
      type: DataTypes.FLOAT,
    },
    pass_attempted: {
      type: DataTypes.NUMBER,
    },
    pass_completed: {
      type: DataTypes.NUMBER,
    },
    cross_accuracy: {
      type: DataTypes.NUMBER,
    },
    cross_attempted: {
      type: DataTypes.NUMBER,
    },
    cross_completed: {
      type: DataTypes.NUMBER,
    },
  },
  {}
);

export default Distribution;
