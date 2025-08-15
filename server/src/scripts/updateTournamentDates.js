import mongoose from 'mongoose';

const updateTournamentDates = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/sportsphere');
    console.log('✅ Connected to MongoDB');

    // Use the Tournament model directly
    const Tournament = mongoose.model('Tournament', new mongoose.Schema({}, { strict: false }));
    
    const tournaments = await Tournament.find({});
    console.log(`📊 Found ${tournaments.length} tournaments`);

    if (tournaments.length === 0) {
      console.log('❌ No tournaments found. Please seed the database first.');
      process.exit(1);
    }

    for (const tournament of tournaments) {
      console.log(`\n🏆 Processing: ${tournament.name}`);
      console.log(`📧 ID: ${tournament._id.toString()}`);

      // Update registration dates to make it open for registration
      const now = new Date();
      const registrationStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
      const registrationEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
      const tournamentStart = new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000); // 35 days from now
      const tournamentEnd = new Date(now.getTime() + 40 * 24 * 60 * 60 * 1000); // 40 days from now

      const updateResult = await Tournament.updateOne(
        { _id: tournament._id },
        {
          $set: {
            'dates.registrationStart': registrationStart,
            'dates.registrationEnd': registrationEnd,
            'dates.tournamentStart': tournamentStart,
            'dates.tournamentEnd': tournamentEnd,
            status: 'upcoming'
          }
        }
      );

      console.log(`✅ Updated: ${updateResult.modifiedCount} document(s)`);
      console.log(`📅 Registration: ${registrationStart.toDateString()} - ${registrationEnd.toDateString()}`);
    }

    console.log('\n🎉 All tournaments updated successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('💥 Error updating tournaments:', error);
    process.exit(1);
  }
};

updateTournamentDates();
