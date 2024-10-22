
import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

const User = types.model({
  id: types.identifierNumber,
  firstName: types.string,
  lastName: types.string,
  email: types.string,
  company: types.model({
    name: types.string,
  }),
}).views(self => ({
  get name() {
    return `${self.firstName} ${self.lastName}`;  
  }
}));



const UserStore = types
  .model({
    users: types.array(User),
    isLoading: types.boolean,
  })
  .actions((self) => ({
    fetchUsers: flow(function* () {
      self.isLoading = true;
      try {
        const response = yield axios.get('https://dummyjson.com/users');
        self.users = response.data.users;
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

export const userStore = UserStore.create({
  users: [],
  isLoading: false,
});
