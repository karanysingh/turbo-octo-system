import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { DbConnector } from "../config/db";
import Disciplinary from "./disciplinary";

const Players_Info = DbConnector.getClient().define(
  "Players_Info",
  {
    player_id: {
      type: DataTypes.BIGINT,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    club: {
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    freezeTableName: true,
  }
);

export default Players_Info;
