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
exports.uefaController = void 0;
const express_1 = __importDefault(require("express"));
const UefaService_1 = require("../service/UefaService");
const router = express_1.default.Router();
exports.uefaController = router;
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uefaService = new UefaService_1.UefaService();
    try {
        const { player_names: playerNames, club_names, position, type } = req.query;
        var clubNames;
        if (club_names) {
            clubNames = club_names.toString().split(",");
        }
        if (type && clubNames && clubNames.length == 1) {
            console.log("type and clubNames");
            const result = yield uefaService.getPlayerStats(clubNames[0], type);
            res.status(200).send(result);
        }
        else if (clubNames && position) {
            const result = yield uefaService.getGoalsScoredinPosition(clubNames, position);
            res.status(200).send(result);
        }
        else if (clubNames) {
            const result = yield uefaService.getClubsStats(clubNames);
            res.status(200).send(result);
        }
        else if (playerNames) {
            const playerInfo = yield uefaService.getPlayerInfo(playerNames);
            return res.status(200).json(playerInfo);
        }
        else {
            const clubGoalsRank = yield uefaService.getClubGoalsRanks();
            return res.status(200).json(clubGoalsRank);
        }
    }
    catch (err) {
        next(err);
    }
}));
router.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
