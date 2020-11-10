import { getUsers } from "../api.js";
import { getUserInfo } from "../localStorage.js";

const UserListScreen = {
render: async () => {
  // 로그인이 되어있지 않으면 페이지에 접근핳 수 없디.
  const { token } = getUserInfo();
  if(!token) {
    document.location.hash = '/signin';
  } 
  const users = await getUsers();
  console.log(users);
  return `
  <div class='dashboard'>
    <div class='dashboard-content'>
      <h3>User list</h3>
      <div class='order-list'>
        <table>
          <thead>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th class='statusTh'>Status</th>
            <th class='tr-action'>ACTION</th>
          </thead>
          <tbody>
          ${users.map((user) => 
            `<tr>
              <td>${user.user_id}</td>
              <td>${user.user_email}</td>
              <td>${user.user_name}</td>
              <td><button class='statusBtn'>${user.user_status}<button></td>
              <td>
              <button id='${user.user_id}' class='edit-button'>Details</button>
              <button id='${user.user_id}' class='delete-button'>Delete</button>
              </td>
            </tr> 
            ` 
            ).join('\n')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `
}
};

export default UserListScreen;

