import { signin } from '../api.js'
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const SigninScreen = {
  after_render: () => {
    document.getElementById('signin-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();
      const data = await signin({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      });
      console.log(data)
      //console.log(data.message)
      hideLoading();
      if(data.message) {
        showMessage(data.message);
      } else {
        setUserInfo(data);
        document.location.hash = '/';
      }
    })
  },
  render: () => {
    //로그인한 사람은 로그인 페이지에 들어가지 못하게 하는 코드
     if(getUserInfo().token) {
      document.location.hash = '/';
    }   
    return `
    <div class="form-container">
    <form id="signin-form">
      <ul class="form-items">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          <label for="email">Email</label>
          <input type="email" name="email" id="email" />
        </li>
        <li>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
        </li>
        <li>
          <button type="submit" class="primary">Sign In</button>
        </li>
        <li>
          <div>
            New User?
            <a href="/#/signup">Create your account</a>
          </div>
        </li>
      </ul>
    </form>
  </div>`
  }
};

export default SigninScreen;