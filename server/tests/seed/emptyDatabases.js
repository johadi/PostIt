import seeder from './seeder';

const emptyDatabases = () => {
  // Clear Test database
  before(seeder.emptyUser);
  before(seeder.emptyMessage);
  before(seeder.emptyGroup);
  before(seeder.emptyUserGroup);
};
const emptyAuthDatabase = () => {
  before(seeder.emptyUser);
  before(seeder.emptyPasswordRecovery);
};
export { emptyAuthDatabase };
export default emptyDatabases;
