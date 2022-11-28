import { DbConnector } from "../config/db";
import Disciplinary from "../models/disciplinary";
import Goalkeeping from "../models/goalkeeping";
import Goals from "../models/goals";
import Key_stats from "../models/key_stats";
import Players_Info from "../models/players_info";
import Attacking from "../models/attacking";
import Defending from "../models/defending";

interface PlayerStats {
  name: string;
  type: string;
  club: string;
  attack?: {
    goals_scored: number;
    assists: number;
    corners: number;
    offsides: number;
    dribbles: number;
  };
  defence?: {
    goals: number;
    tackles_won: number;
    tackles_lost: number;
    clearance_attempts: number;
    balls_recovered: number;
  };
  goalkeeping?: {
    saved: number;
    conceded: number;
    clean_sheets: number;
    punches: number;
  };
}

export class UefaRepository {
  public async getGoalsScored(clubName: string): Promise<number> {
    let sequelize = DbConnector.getClient();
    const goals = await Goals.findAll({
      attributes: [
        "club",
        [sequelize.fn("sum", sequelize.col("goals")), "total_goals_scored"],
      ],
      where: { club: clubName },
    });
    return goals[0].dataValues.total_goals_scored;
  }

  public async getGoalsConceded(clubName: string): Promise<number> {
    let sequelize = DbConnector.getClient();
    const goals = await Goalkeeping.findAll({
      attributes: [
        "club",
        [
          sequelize.fn("sum", sequelize.col("conceded")),
          "total_goals_conceded",
        ],
      ],
      where: { club: clubName },
    });
    return goals[0].dataValues.total_goals_conceded;
  }

  public async getMatchesPlayed(clubName: string): Promise<number> {
    let sequelize = DbConnector.getClient();
    const goals = await Goalkeeping.findAll({
      attributes: [
        "club",
        [sequelize.fn("sum", sequelize.col("match_played")), "matches_played"],
      ],
      where: { club: clubName },
    });
    return goals[0].dataValues.matches_played;
  }

  public async getAssists(clubName: string): Promise<number> {
    let sequelize = DbConnector.getClient();
    const assists = await Key_stats.findOne({
      attributes: [
        "club",
        [sequelize.fn("sum", sequelize.col("assists")), "total_assists"],
      ],
      where: { club: clubName },
    });
    return assists.dataValues.total_assists;
  }

  public async getTopScorer(clubName: string): Promise<string> {
    const sequelize = DbConnector.getClient();
    const player_id = await Goals.findOne({
      attributes: [
        "player_id",
        [sequelize.fn("max", sequelize.col("goals")), "max_goals"],
        "club",
      ],
      group: ["player_id", "club"],
      order: [["max_goals", "DESC"]],
      where: { club: clubName },
    });
    const player_name = await Players_Info.findOne({
      attributes: ["first_name", "last_name"],
      where: { player_id: player_id.dataValues.player_id },
    });
    return (
      player_name.dataValues.first_name + " " + player_name.dataValues.last_name
    );
  }

  public async getGoalsSaved(clubName: string): Promise<number> {
    let sequelize = DbConnector.getClient();
    const goals = await Goalkeeping.findAll({
      attributes: [
        "club",
        [sequelize.fn("sum", sequelize.col("saved")), "total_goals_saved"],
      ],
      where: { club: clubName },
    });
    return goals[0].dataValues.total_goals_saved;
  }

  public async getGoalRanks(): Promise<any> {
    const goals = await Goals.findAll({
      attributes: ["club"],
      order: [["goals", "DESC"]],
    });
    const arr = goals.map((que) => que.dataValues.club);
    return arr;
  }

  public async getPlayerStats(playerName: string): Promise<any> {
    const dbClient = DbConnector.getClient();

    const [results, meta] = await dbClient.query(
      "select distinct k.player_name, k.club, k.goals, k.minutes_played, d.yellow, d.red, d.fouls_committed, d.fouls_suffered from key_stats k, disciplinary d, players_info p where p.player_id = d.player_id and p.player_id = k.player_id" +
        ` and k.player_name="${playerName}"`
    );
    if (results.length == 0) {
      return [];
    }
    return results[0];
  }

  public async getGoalsScoredInPosition(
    clubName: string,
    position: string
  ): Promise<number> {
    const goals = await Goals.findOne({
      attributes: ["goals"],
      where: {
        club: clubName,
        position: position,
      },
    });
    return goals.dataValues.goals;
  }

  public async getClubStats(clubNames: string[]): Promise<any> {
    let resultList = [];

    for (const club in clubNames) {
      const [result, meta] = await DbConnector.getClient().query(
        "select distinct k.player_name, k.goals, g.conceded, g.saved, g.match_played, a.assists from key_stats k, goalkeeping g, attacking a where k.club=g.club and k.club=a.club and k.club=" +
          `"${club}"`
      );
      resultList.push(result);
    }

    return resultList;
  }

  public async getPlayerStatsByType(
    clubName: string,
    type: string
  ): Promise<PlayerStats[]> {
    const sequelize = DbConnector.getClient();

    const player_res = await Players_Info.findAll({
      attributes: ["player_id", "first_name", "last_name", "club"],
      where: { club: clubName },
    });

    let playerStats = player_res.map(async (player) => {
      const player_id = player.dataValues.player_id;
      const player_name =
        player.dataValues.first_name + " " + player.dataValues.last_name;
      const club = player.dataValues.club;
      const attacking = await Attacking.findOne({
        attributes: ["assists", "corner_taken", "offsides", "dribbles"],
        where: { player_id: player_id },
      });
      const goals = await Goals.findOne({
        attributes: ["goals"],
        where: { player_id: player_id },
      });
      const defending = await Defending.findOne({
        attributes: [
          "balls_recoverd",
          "t_won",
          "t_lost",
          "clearance_attempted",
          "tackles",
        ],
        where: { player_id: player_id },
      });

      const goalkeeping = await Goalkeeping.findOne({
        attributes: ["conceded", "saved", "cleansheets", "punches_made"],
        where: { player_id: player_id },
      });

      return {
        name: player_name,
        type: type,
        club: club,
        attack: {
          goals_scored: 0,
          assists: attacking?.dataValues.assists || 0,
          corners: attacking?.dataValues.corner_taken || 0,
          offsides: attacking?.dataValues.offsides || 0,
          dribbles: attacking?.dataValues.dribbles || 0,
        },
        defence: {
          goals: goals?.dataValues.goals || 0,
          tackles_won: defending?.dataValues.t_won || 0,
          tackles_lost: defending?.dataValues.t_lost || 0,
          clearance_attempts: defending?.dataValues.clearance_attempted || 0,
          balls_recovered: defending?.dataValues.balls_recoverd || 0,
        },
        goalkeeping: {
          saved: goalkeeping?.dataValues.saved || 0,
          conceded: goalkeeping?.dataValues.conceded || 0,
          clean_sheets: goalkeeping?.dataValues.cleansheets || 0,
          punches: goalkeeping?.dataValues.punches_made || 0,
        },
      };
    });

    return Promise.all(playerStats);
  }
}
