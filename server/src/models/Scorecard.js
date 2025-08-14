import mongoose from 'mongoose';

const scorecardSchema = new mongoose.Schema(
  {
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    sportsCategory: {
      type: String,
      required: true,
      enum: ["cricket", "football", "volleyball", "kabaddi", "badminton"],
    },
    // Cricket specific fields
    cricket: {
      innings: [
        {
          team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
          },
          runs: { type: Number, default: 0 },
          wickets: { type: Number, default: 0 },
          overs: { type: Number, default: 0 },
          balls: { type: Number, default: 0 },
          extras: {
            wides: { type: Number, default: 0 },
            noBalls: { type: Number, default: 0 },
            byes: { type: Number, default: 0 },
            legByes: { type: Number, default: 0 },
          },
          batsmen: [
            {
              player: String,
              runs: { type: Number, default: 0 },
              balls: { type: Number, default: 0 },
              fours: { type: Number, default: 0 },
              sixes: { type: Number, default: 0 },
              isOut: { type: Boolean, default: false },
              dismissal: String,
            },
          ],
          bowlers: [
            {
              player: String,
              overs: { type: Number, default: 0 },
              runs: { type: Number, default: 0 },
              wickets: { type: Number, default: 0 },
              maidens: { type: Number, default: 0 },
            },
          ],
        },
      ],
    },
    // Football specific fields
    football: {
      teams: [
        {
          team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
          },
          goals: { type: Number, default: 0 },
          shots: { type: Number, default: 0 },
          possession: { type: Number, default: 0 },
          corners: { type: Number, default: 0 },
          fouls: { type: Number, default: 0 },
          yellowCards: { type: Number, default: 0 },
          redCards: { type: Number, default: 0 },
          goalScorers: [
            {
              player: String,
              minute: Number,
              type: {
                type: String,
                enum: ["goal", "penalty", "own-goal"],
                default: "goal",
              },
            },
          ],
        },
      ],
      currentHalf: {
        type: String,
        enum: ["first", "second", "extra-first", "extra-second", "penalties"],
        default: "first",
      },
      matchTime: { type: Number, default: 0 },
    },
    // Volleyball specific fields
    volleyball: {
      sets: [
        {
          team1Score: { type: Number, default: 0 },
          team2Score: { type: Number, default: 0 },
          winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
          },
        },
      ],
      currentSet: { type: Number, default: 1 },
      team1Sets: { type: Number, default: 0 },
      team2Sets: { type: Number, default: 0 },
    },
    // Kabaddi specific fields
    kabaddi: {
      teams: [
        {
          team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
          },
          score: { type: Number, default: 0 },
          raids: { type: Number, default: 0 },
          tackles: { type: Number, default: 0 },
          allOuts: { type: Number, default: 0 },
        },
      ],
      currentHalf: {
        type: String,
        enum: ["first", "second"],
        default: "first",
      },
      matchTime: { type: Number, default: 0 },
    },
    // Badminton specific fields
    badminton: {
      sets: [
        {
          team1Score: { type: Number, default: 0 },
          team2Score: { type: Number, default: 0 },
          winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
          },
        },
      ],
      currentSet: { type: Number, default: 1 },
      team1Sets: { type: Number, default: 0 },
      team2Sets: { type: Number, default: 0 },
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Scorecard", scorecardSchema);
