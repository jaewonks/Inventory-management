import { signup } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const SignupScreen = {
  after_render: () => {
    document.getElementById('signup-form')
      .addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();
      const data = await signup({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      })
      console.log(data)
      hideLoading();
      if(data.message) {
        showMessage(data.message);
      } else {
        //setUserInfo(data);
        document.location.hash= '/';
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
    <form id="signup-form">
      <ul class="form-items">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          <label for="name">Name</label>
          <input type="text" name="name" id="name" />
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
          <label for="repassword">Re-Enter Password</label>
          <input type="password" name="repassword" id="repassword" />
        </li>
        <li>
          <button type="submit" class="primary">Sign Up</button>
        </li>
        <li>
          <div>
            Already have an account?
            <a href="/#/signin">Sign-in</a>
          </div>
        </li>
      </ul>
    </form>
  </div>`
  }
};

export default SignupScreen;