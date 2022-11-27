interface PlayerInfo {
  club: string
  goals_scored: number
  minutes_played: number
  fouls_committed: number
  fouls_suffered: number
  red_cards: number
  yellow_cards: number
}

interface ClubGoalsRanking {
  highest_goals: number
  lowest_goals: number
  second_highest_goals: number
}

interface ClubStats {
  total_goals_scored: number
  total_goals_conceded: number
  total_goals_saved: number
  total_matches_played: number
  total_assists: number
  top_scorer: number
}

interface PlayerStats {
    name: string;
    attack: {
        goals_scored: number
        assists: number
        corners: number
        offsides: number
        dribbles: number
    }
    defence: {
        goals: number
        tackles_won: number
        tackles_lost: number
        clearance_attempts: number
        balls_recovered: number
    }
    goalkeeping: {
        saved: number
        conceded: number
        clean_sheets: number
        punches: number
    }
}

export class UefaService {
  public async getPlayerInfo(playerName: string[]): Promise<PlayerInfo[]> {
    const playerInfo: PlayerInfo[] = [{
      club: "Real Madrid",
      goals_scored: 10,
      minutes_played: 1000,
      fouls_committed: 10,
      fouls_suffered: 10,
      red_cards: 0,
      yellow_cards: 0,
    }];
    return playerInfo;
  }

  public async getClubGoalsRanks(): Promise<ClubGoalsRanking> {
    const clubs = {
      highest_goals: 10,
      lowest_goals: 10,
      second_highest_goals: 10,
    };
    return clubs;
  }

  public async getClubsStats(clubNames: string[]): Promise<ClubStats[]> {
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
  }

  public async getGoalsScoredinPosition(
    clubNames: string[],
    position: string
  ): Promise<number[]> {
    return [10, 10, 10];
  }

  public async getPlayerStats(
    clubName: string,
    type: "attack" | "defence" | "goalkeeping"
  ): Promise<PlayerStats[]> {
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
  }
}
