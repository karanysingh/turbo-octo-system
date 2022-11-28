import { DataTypes } from "sequelize";
import sequelize from "sequelize/types/sequelize";
import { DbConnector } from "../config/db";

const Goalkeeping = DbConnector.getClient().define(
  "Goalkeeping",
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
    saved: {
      type: DataTypes.NUMBER,
    },
    conceded: {
      type: DataTypes.NUMBER,
    },
    saved_penalties: {
      type: DataTypes.NUMBER,
    },
    cleansheets: {
      type: DataTypes.NUMBER,
    },
    punches_made: {
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

export default Goalkeeping;
