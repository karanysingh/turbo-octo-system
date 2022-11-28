import { UefaRepository } from "../repository/UefaRepository";
const uefaRepository: UefaRepository = new UefaRepository();

interface PlayerInfo {
  club: string;
  goals_scored: number;
  minutes_played: number;
  fouls_committed: number;
  fouls_suffered: number;
  red_cards: number;
  yellow_cards: number;
}

interface ClubGoalsRanking {
  highest_goals: number;
  lowest_goals: number;
  second_highest_goals: number;
}

interface ClubStats {
  total_goals_scored: number;
  total_goals_conceded: number;
  total_goals_saved: number;
  total_matches_played: number;
  total_assists: number;
  top_scorer: string;
}

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

export class UefaService {
  public async getPlayerInfo(playerName: string): Promise<PlayerInfo[]> {
    const player_data = await uefaRepository.getPlayerStats(playerName);

    const playerInfo: PlayerInfo[] = [
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
  }

  public async getClubGoalsRanks(): Promise<ClubGoalsRanking> {
    const clubGoalsRanking = await uefaRepository.getGoalRanks();
    const clubs = {
      highest_goals: clubGoalsRanking[0],
      lowest_goals: clubGoalsRanking[clubGoalsRanking.length - 1],
      second_highest_goals: clubGoalsRanking[clubGoalsRanking.length - 2],
    };
    return clubs;
  }

  public async getClubsStats(clubNames: string[]): Promise<ClubStats[]> {
    let clubStats = clubNames.map(async (clubName) => {
      return {
        total_goals_scored: await uefaRepository.getGoalsScored(clubName),
        total_goals_conceded: await uefaRepository.getGoalsConceded(clubName),
        total_goals_saved: await uefaRepository.getGoalsSaved(clubName),
        total_matches_played: await uefaRepository.getMatchesPlayed(clubName),
        total_assists: await uefaRepository.getAssists(clubName),
        top_scorer: await uefaRepository.getTopScorer(clubName),
      };
    });
    return Promise.all(clubStats);
  }

  public async getGoalsScoredinPosition(
    clubNames: string[],
    position: string
  ): Promise<number[]> {
    let goalsScored = clubNames.map(async (clubName) => {
      return await uefaRepository.getGoalsScoredInPosition(clubName, position);
    });
    return Promise.all(goalsScored);
  }

  public async getPlayerStats(
    clubName: string,
    type: string
  ): Promise<PlayerStats[]> {
    const playerStats = await uefaRepository.getPlayerStatsByType(
      clubName,
      type
    );
    console.log(playerStats);
    return playerStats;
  }
}
