"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UefaRepository = void 0;
const db_1 = require("../config/db");
const goalkeeping_1 = __importDefault(require("../models/goalkeeping"));
const goals_1 = __importDefault(require("../models/goals"));
const key_stats_1 = __importDefault(require("../models/key_stats"));
const players_info_1 = __importDefault(require("../models/players_info"));
const attacking_1 = __importDefault(require("../models/attacking"));
const defending_1 = __importDefault(require("../models/defending"));
class UefaRepository {
    getGoalsScored(clubName) {
        return __awaiter(this, void 0, void 0, function* () {
            let sequelize = db_1.DbConnector.getClient();
            const goals = yield goals_1.default.findAll({
                attributes: [
                    "club",
                    [sequelize.fn("sum", sequelize.col("goals")), "total_goals_scored"],
                ],
                where: { club: clubName },
            });
            return goals[0].dataValues.total_goals_scored;
        });
    }
    getGoalsConceded(clubName) {
        return __awaiter(this, void 0, void 0, function* () {
            let sequelize = db_1.DbConnector.getClient();
            const goals = yield goalkeeping_1.default.findAll({
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
        });
    }
    getMatchesPlayed(clubName) {
        return __awaiter(this, void 0, void 0, function* () {
            let sequelize = db_1.DbConnector.getClient();
            const goals = yield goalkeeping_1.default.findAll({
                attributes: [
                    "club",
                    [sequelize.fn("sum", sequelize.col("match_played")), "matches_played"],
                ],
                where: { club: clubName },
            });
            return goals[0].dataValues.matches_played;
        });
    }
    getAssists(clubName) {
        return __awaiter(this, void 0, void 0, function* () {
            let sequelize = db_1.DbConnector.getClient();
            const assists = yield key_stats_1.default.findOne({
                attributes: [
                    "club",
                    [sequelize.fn("sum", sequelize.col("assists")), "total_assists"],
                ],
                where: { club: clubName },
            });
            return assists.dataValues.total_assists;
        });
    }
    getTopScorer(clubName) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelize = db_1.DbConnector.getClient();
            const player_id = yield goals_1.default.findOne({
                attributes: [
                    "player_id",
                    [sequelize.fn("max", sequelize.col("goals")), "max_goals"],
                    "club",
                ],
                group: ["player_id", "club"],
                order: [["max_goals", "DESC"]],
                where: { club: clubName },
            });
            const player_name = yield players_info_1.default.findOne({
                attributes: ["first_name", "last_name"],
                where: { player_id: player_id.dataValues.player_id },
            });
            return (player_name.dataValues.first_name + " " + player_name.dataValues.last_name);
        });
    }
    getGoalsSaved(clubName) {
        return __awaiter(this, void 0, void 0, function* () {
            let sequelize = db_1.DbConnector.getClient();
            const goals = yield goalkeeping_1.default.findAll({
                attributes: [
                    "club",
                    [sequelize.fn("sum", sequelize.col("saved")), "total_goals_saved"],
                ],
                where: { club: clubName },
            });
            return goals[0].dataValues.total_goals_saved;
        });
    }
    getGoalRanks() {
        return __awaiter(this, void 0, void 0, function* () {
            const goals = yield goals_1.default.findAll({
                attributes: ["club"],
                order: [["goals", "DESC"]],
            });
            const arr = goals.map((que) => que.dataValues.club);
            return arr;
        });
    }
    getPlayerStats(playerName) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = db_1.DbConnector.getClient();
            const [results, meta] = yield dbClient.query("select distinct k.player_name, k.club, k.goals, k.minutes_played, d.yellow, d.red, d.fouls_committed, d.fouls_suffered from key_stats k, disciplinary d, players_info p where p.player_id = d.player_id and p.player_id = k.player_id" +
                ` and k.player_name="${playerName}"`);
            if (results.length == 0) {
                return [];
            }
            return results[0];
        });
    }
    getGoalsScoredInPosition(clubName, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const goals = yield goals_1.default.findOne({
                attributes: ["goals"],
                where: {
                    club: clubName,
                    position: position,
                },
            });
            return goals.dataValues.goals;
        });
    }
    getClubStats(clubNames) {
        return __awaiter(this, void 0, void 0, function* () {
            let resultList = [];
            for (const club in clubNames) {
                const [result, meta] = yield db_1.DbConnector.getClient().query("select distinct k.player_name, k.goals, g.conceded, g.saved, g.match_played, a.assists from key_stats k, goalkeeping g, attacking a where k.club=g.club and k.club=a.club and k.club=" +
                    `"${club}"`);
                resultList.push(result);
            }
            return resultList;
        });
    }
    getPlayerStatsByType(clubName, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const player_res = yield players_info_1.default.findAll({
                attributes: ["player_id", "first_name", "last_name", "club"],
                where: { club: clubName },
            });
            let playerStats = player_res.map((player) => __awaiter(this, void 0, void 0, function* () {
                const player_id = player.dataValues.player_id;
                const player_name = player.dataValues.first_name + " " + player.dataValues.last_name;
                const club = player.dataValues.club;
                const attacking = yield attacking_1.default.findOne({
                    attributes: ["assists", "corner_taken", "offsides", "dribbles"],
                    where: { player_id: player_id },
                });
                const goals = yield goals_1.default.findOne({
                    attributes: ["goals"],
                    where: { player_id: player_id },
                });
                const defending = yield defending_1.default.findOne({
                    attributes: [
                        "balls_recoverd",
                        "t_won",
                        "t_lost",
                        "clearance_attempted",
                        "tackles",
                    ],
                    where: { player_id: player_id },
                });
                const goalkeeping = yield goalkeeping_1.default.findOne({
                    attributes: ["conceded", "saved", "cleansheets", "punches_made"],
                    where: { player_id: player_id },
                });
                return {
                    name: player_name,
                    type: type,
                    club: club,
                    attack: {
                        goals_scored: 0,
                        assists: (attacking === null || attacking === void 0 ? void 0 : attacking.dataValues.assists) || 0,
                        corners: (attacking === null || attacking === void 0 ? void 0 : attacking.dataValues.corner_taken) || 0,
                        offsides: (attacking === null || attacking === void 0 ? void 0 : attacking.dataValues.offsides) || 0,
                        dribbles: (attacking === null || attacking === void 0 ? void 0 : attacking.dataValues.dribbles) || 0,
                    },
                    defence: {
                        goals: (goals === null || goals === void 0 ? void 0 : goals.dataValues.goals) || 0,
                        tackles_won: (defending === null || defending === void 0 ? void 0 : defending.dataValues.t_won) || 0,
                        tackles_lost: (defending === null || defending === void 0 ? void 0 : defending.dataValues.t_lost) || 0,
                        clearance_attempts: (defending === null || defending === void 0 ? void 0 : defending.dataValues.clearance_attempted) || 0,
                        balls_recovered: (defending === null || defending === void 0 ? void 0 : defending.dataValues.balls_recoverd) || 0,
                    },
                    goalkeeping: {
                        saved: (goalkeeping === null || goalkeeping === void 0 ? void 0 : goalkeeping.dataValues.saved) || 0,
                        conceded: (goalkeeping === null || goalkeeping === void 0 ? void 0 : goalkeeping.dataValues.conceded) || 0,
                        clean_sheets: (goalkeeping === null || goalkeeping === void 0 ? void 0 : goalkeeping.dataValues.cleansheets) || 0,
                        punches: (goalkeeping === null || goalkeeping === void 0 ? void 0 : goalkeeping.dataValues.punches_made) || 0,
                    },
                };
            }));
            return Promise.all(playerStats);
        });
    }
}
exports.UefaRepository = UefaRepository;
