// import {
//   createStubInstance,
//   expect,
//   sinon,
//   StubbedInstanceWithSinonAccessor,
// } from '@loopback/testlab';
// import {UserRepository} from '../../repositories';
// import {UserController} from '../../controllers';
// import {User} from '../../models';

// describe('UserController (unit)', () => {
//   let repository: StubbedInstanceWithSinonAccessor<UserRepository>;
//   beforeEach(givenStubbedRepository);

//   describe('find()', () => {
//     it('fetches all the users', async () => {
//       const controller = new UserController(repository);

//       const fetchedUsers = [
//         new User({
//           id: 1,
//           firstname: 'Leo',
//           middlename: 'GOAT',
//           lastname: 'Messi',
//           region: 'Argentina',
//           email: 'lm10@goat.com',
//           phone: 10303010,
//           dob: '1986-09-13T04:16:36.382Z',
//           rolekey: 1,
//           customerId: 1,
//         }),
//         new User({
//           id: 2,
//           firstname: 'Christiano',
//           middlename: 'goal machine',
//           lastname: 'Ronaldo',
//           region: 'Portugal',
//           email: 'cr7@rm.com',
//           phone: 7777,
//           dob: '1980-06-08T04:16:36.382Z',
//           rolekey: 1,
//           customerId: 3,
//         }),
//       ];

//       repository.stubs.find.resolves(fetchedUsers);

//       const users = await controller.find();

//       expect(users).to.deepEqual(fetchedUsers);
//       sinon.assert.calledWithMatch(repository.stubs.find);
//     });
//   });

//   describe('deleteById()', () => {
//     it('deletes the user with the given id', async () => {
//       const controller = new UserController(repository);
//       await controller.deleteById(2);
//       sinon.assert.calledWithMatch(repository.stubs.deleteById, 2);
//     });
//   });

//   function givenStubbedRepository() {
//     repository = createStubInstance(UserRepository);
//   }
// });
