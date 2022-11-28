import { DataTypes, Sequelize } from "sequelize";
import { DbConnector } from "../config/db";

const Defending = DbConnector.getClient().define(
  "Attacking",
  {
    firstName: {
      type: DataTypes.BIGINT,
    },
    club: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    assists: {
      type: DataTypes.NUMBER,
    },
    corner_taken: {
      type: DataTypes.NUMBER,
    },
    offsides: {
      type: DataTypes.NUMBER,
    },
    dribbles: {
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
