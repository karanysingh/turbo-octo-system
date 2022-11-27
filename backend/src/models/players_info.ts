import { DataTypes } from "sequelize";
import { DbConnector } from "../config/db";

const PlayersInfo = DbConnector.getClient().define(
  "PlayersInfo",
  {
    player_id: {
      type: DataTypes.BIGINT,
    },
    first_name:{
        type: DataTypes.STRING,
    },
    last_name:{
        type: DataTypes.STRING,
    },
    club: {
      type: DataTypes.STRING,
    },
  },
  {}
);

export default PlayersInfo;
