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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UefaService = void 0;
const UefaRepository_1 = require("../repository/UefaRepository");
const uefaRepository = new UefaRepository_1.UefaRepository();
class UefaService {
    getPlayerInfo(playerName) {
        return __awaiter(this, void 0, void 0, function* () {
            const player_data = yield uefaRepository.getPlayerStats(playerName);
            const playerInfo = [
                {
                    club: player_data.club,
                    goals_scored: player_data.goals,
                    minutes_played: player_data.minutes_played,
                    fouls_committed: player_data.fouls_committed,
                    fouls_suffered: player_data.fouls_suffered,
                    red_cards: player_data.red,
                    yellow_cards: player_data.yellow,
                },
            ];
            return playerInfo;
        });
    }
    getClubGoalsRanks() {
        return __awaiter(this, void 0, void 0, function* () {
            const clubGoalsRanking = yield uefaRepository.getGoalRanks();
            const clubs = {
                highest_goals: clubGoalsRanking[0],
                lowest_goals: clubGoalsRanking[clubGoalsRanking.length - 1],
                second_highest_goals: clubGoalsRanking[clubGoalsRanking.length - 2],
            };
            return clubs;
        });
    }
    getClubsStats(clubNames) {
        return __awaiter(this, void 0, void 0, function* () {
            let clubStats = clubNames.map((clubName) => __awaiter(this, void 0, void 0, function* () {
                return {
                    total_goals_scored: yield uefaRepository.getGoalsScored(clubName),
                    total_goals_conceded: yield uefaRepository.getGoalsConceded(clubName),
                    total_goals_saved: yield uefaRepository.getGoalsSaved(clubName),
                    total_matches_played: yield uefaRepository.getMatchesPlayed(clubName),
                    total_assists: yield uefaRepository.getAssists(clubName),
                    top_scorer: yield uefaRepository.getTopScorer(clubName),
                };
            }));
            return Promise.all(clubStats);
        });
    }
    getGoalsScoredinPosition(clubNames, position) {
        return __awaiter(this, void 0, void 0, function* () {
            let goalsScored = clubNames.map((clubName) => __awaiter(this, void 0, void 0, function* () {
                return yield uefaRepository.getGoalsScoredInPosition(clubName, position);
            }));
            return Promise.all(goalsScored);
        });
    }
    getPlayerStats(clubName, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerStats = yield uefaRepository.getPlayerStatsByType(clubName, type);
            return playerStats;
        });
    }
}
exports.UefaService = UefaService;
