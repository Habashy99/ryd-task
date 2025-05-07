import { AppDataSource } from './main';
import { runSeeders } from 'typeorm-extension';

AppDataSource.initialize()
  .then(async () => {
    await runSeeders(AppDataSource);
    console.log('✅ Seeding done!');
    await AppDataSource.destroy();
  })
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
  });