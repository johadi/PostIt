import seeder from './seeder';

const emptyDatabases = () => {
  // Clear Test database
  before(seeder.emptyUser);
  before(seeder.emptyMessage);
  before(seeder.emptyGroup);
  before(seeder.emptyUserGroup);
};
const emptyAuthDatabases = () => {
  before(seeder.emptyUser);
  before(seeder.emptyPasswordRecovery);
};
export { emptyAuthDatabases };
export default emptyDatabases;
