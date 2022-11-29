import express, { Request, Response, NextFunction } from "express";
import { UefaService } from "../service/UefaService";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const uefaService = new UefaService();

  try {
    const { player_names:playerNames, club_names, position, type } = req.query;

    let clubNames: string[];

    if (club_names) {
        clubNames = club_names.toString().split(",");
    }

    if (type && club_names && clubNames.length == 1) {
      const result = await uefaService.getPlayerStats(
        clubNames[0],
        type.toString()
      );
      res.status(200).send(result);

    } else if (club_names && position) {
      const result = await uefaService.getGoalsScoredinPosition(
        clubNames as string[],
        position as string
      );
      res.status(200).send(result);

    } else if (club_names) {
      const result = await uefaService.getClubsStats(clubNames);
      res.status(200).send(result);

    } else if (playerNames) {
      const playerInfo = await uefaService.getPlayerInfo(playerNames as string);
      return res.status(200).json(playerInfo);

    } else {
      const clubGoalsRank = await uefaService.getClubGoalsRanks();
      return res.status(200).json(clubGoalsRank);
    }
  } catch (err) {
    next(err);
  }
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(err.message);
});

export { router as uefaController };
