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
class UefaService {
    getPlayerInfo(playerName) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerInfo = [{
                    club: "Real Madrid",
                    goals_scored: 10,
                    minutes_played: 1000,
                    fouls_committed: 10,
                    fouls_suffered: 10,
                    red_cards: 0,
                    yellow_cards: 0,
                }];
            return playerInfo;
        });
    }
    getClubGoalsRanks() {
        return __awaiter(this, void 0, void 0, function* () {
            const clubs = {
                highest_goals: 10,
                lowest_goals: 10,
                second_highest_goals: 10,
            };
            return clubs;
        });
    }
    getClubsStats(clubNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const clubStats = [
                {
                    total_goals_scored: 10,
                    total_goals_conceded: 10,
                    total_goals_saved: 10,
                    total_matches_played: 10,
                    total_assists: 10,
                    top_scorer: 10,
                },
            ];
            return clubStats;
        });
    }
    getGoalsScoredinPosition(clubNames, position) {
        return __awaiter(this, void 0, void 0, function* () {
            return [10, 10, 10];
        });
    }
    getPlayerStats(clubName, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerStats = [
                {
                    name: "Ronaldo",
                    attack: {
                        goals_scored: 10,
                        assists: 10,
                        corners: 10,
                        offsides: 10,
                        dribbles: 10,
                    },
                    defence: {
                        goals: 10,
                        tackles_won: 10,
                        tackles_lost: 10,
                        clearance_attempts: 10,
                        balls_recovered: 10,
                    },
                    goalkeeping: {
                        saved: 10,
                        conceded: 10,
                        clean_sheets: 10,
                        punches: 10,
                    },
                },
            ];
            return playerStats;
        });
    }
}
exports.UefaService = UefaService;
