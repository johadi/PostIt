import seeder from './seeder';

const seedDatabases = () => {
  // Add users to Database
  // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
  before(seeder.addFirstUser);
  // {id: 20, username: oman, email: oman@gmail.com} User
  before(seeder.addSecondUser);
  // {id: 30, username: sherif, email: sherif@gmail.com} User
  before(seeder.addThirdUser);
  // Create a group
  // {id: 99, name: andela, creatorId: 1} Group
  before(seeder.createFirstGroup);
  // {id: 100, name: react, creatorId: 7} Group
  before(seeder.createSecondGroup);
  // Add users to groups
  // {groupId: 100, userId: 10} UserGroup
  before(seeder.addFirstUserGroup);
  // {groupId: 99, userId: 5} UserGroup
  before(seeder.addSecondUserGroup);
  // {groupId: 99, userId: 20} UserGroup
  before(seeder.addThirdUserGroup);
  // {groupId: 99, userId: 20} UserGroup
  before(seeder.addFourthUserGroup);
  // create a message
  // {groupId: 99, userId: 5, body: 'Carry Something .....'}
  before(seeder.addFirstMessage);
  // {groupId: 100, userId: 20, body: 'Carry Something more than...'}
  before(seeder.addSecondMessage);
  // {groupId: 99, userId: 5, body: 'Learners are leaders .....'}
  before(seeder.addThirdMessage);
};
const seedAuthDatabase = () => {
  before(seeder.addNewUser);
};
export { seedAuthDatabase };
export default seedDatabases;
