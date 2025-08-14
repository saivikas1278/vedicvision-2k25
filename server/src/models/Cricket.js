import mongoose from 'mongoose';

const BatsmanSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  playerName: {
    type: String,
    required: true,
  },
  runs: {
    type: Number,
    default: 0,
  },
  balls: {
    type: Number,
    default: 0,
  },
  fours: {
    type: Number,
    default: 0,
  },
  sixes: {
    type: Number,
    default: 0,
  },
  isOut: {
    type: Boolean,
    default: false,
  },
  outMethod: {
    type: String,
    enum: ['Not Out', 'Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket', 'Retired Hurt', 'Other'],
    default: 'Not Out',
  },
  bowlerName: {
    type: String,
  },
  fielderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  fielderName: {
    type: String,
  },
});

const BowlerSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  playerName: {
    type: String,
    required: true,
  },
  overs: {
    type: Number,
    default: 0,
  },
  balls: {
    type: Number,
    default: 0,
  },
  maidens: {
    type: Number,
    default: 0,
  },
  runs: {
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  },
  wides: {
    type: Number,
    default: 0,
  },
  noBalls: {
    type: Number,
    default: 0,
  },
});

const InningsSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  totalRuns: {
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  },
  overs: {
    type: Number,
    default: 0,
  },
  balls: {
    type: Number,
    default: 0,
  },
  extras: {
    wides: {
      type: Number,
      default: 0,
    },
    noBalls: {
      type: Number,
      default: 0,
    },
    byes: {
      type: Number,
      default: 0,
    },
    legByes: {
      type: Number,
      default: 0,
    },
    penalties: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  batsmen: [BatsmanSchema],
  bowlers: [BowlerSchema],
  currentBatsmen: {
    striker: {
      type: Number,
      default: 0,
    },
    nonStriker: {
      type: Number,
      default: 1,
    },
  },
  currentBowler: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const CricketMatchSchema = new mongoose.Schema({
  matchTitle: {
    type: String,
    required: true,
    trim: true,
  },
  matchType: {
    type: String,
    enum: ['T20', 'ODI', 'Test', 'Custom'],
    default: 'T20',
  },
  overs: {
    type: Number,
    required: true,
    default: 20,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  teams: {
    team1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    team1Name: {
      type: String,
      required: true,
    },
    team2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    team2Name: {
      type: String,
      required: true,
    },
  },
  toss: {
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    winnerName: {
      type: String,
    },
    decision: {
      type: String,
      enum: ['bat', 'bowl'],
    },
  },
  innings: [InningsSchema],
  currentInnings: {
    type: Number,
    default: 0,
  },
  result: {
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    winnerName: {
      type: String,
    },
    margin: {
      runs: {
        type: Number,
      },
      wickets: {
        type: Number,
      },
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed', 'Abandoned', 'Draw'],
      default: 'In Progress',
    },
    description: {
      type: String,
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scorers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  status: {
    type: String,
    enum: ['Upcoming', 'Live', 'Completed'],
    default: 'Upcoming',
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
  },
}, {
  timestamps: true,
});

// Calculate over.balls format from total balls
CricketMatchSchema.methods.calculateOvers = function(balls) {
  const completedOvers = Math.floor(balls / 6);
  const remainingBalls = balls % 6;
  return `${completedOvers}.${remainingBalls}`;
};

// Virtual to get current run rate
CricketMatchSchema.virtual('runRate').get(function() {
  if (this.innings.length === 0) return 0;
  
  const currentInning = this.innings[this.currentInnings];
  if (!currentInning) return 0;
  
  const totalOvers = currentInning.overs + (currentInning.balls / 6);
  if (totalOvers === 0) return 0;
  
  return (currentInning.totalRuns / totalOvers).toFixed(2);
});

export default mongoose.model('CricketMatch', CricketMatchSchema);
