import seeder from './seeder';

/**
 * Empty database for test
 * @function emptyDatabases
 * @return {void} void
 */
const emptyDatabases = () => {
  // Clear Test database
  before(seeder.emptyUser);
  before(seeder.emptyMessage);
  before(seeder.emptyGroup);
  before(seeder.emptyUserGroup);
};
/**
 * Empty auth models in the database for test
 * @function emptyAuthDatabase
 * @return {void} void
 */
const emptyAuthDatabase = () => {
  before(seeder.emptyUser);
  before(seeder.emptyPasswordRecovery);
};
export { emptyAuthDatabase };
export default emptyDatabases;
