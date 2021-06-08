import axios from 'axios';

export default class UsersService {
  getUsers() {
    return axios
      .get('https://6091b5e466bcbf001787bcce.mockapi.io/users')
      .then((res) => res.data);
  }
  getUser(id) {
    return axios
      .get('https://6091b5e466bcbf001787bcce.mockapi.io/users/' + id)
      .then((res) => res.data);
  }
  addUsers(payload) {
    return axios
      .post('https://6091b5e466bcbf001787bcce.mockapi.io/users', payload)
      .then((res) => res.data);
  }
  deletUsers(id) {
    return axios
      .delete('https://6091b5e466bcbf001787bcce.mockapi.io/users/' + id)
      .then((res) => res.data);
  }
  edit(id) {
    return axios
      .put('https://6091b5e466bcbf001787bcce.mockapi.io/users/' + id)
      .then((res) => res.data);
  }
}
