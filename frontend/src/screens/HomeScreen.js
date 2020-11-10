import { getUserInfo } from "../localStorage.js";

const HomeScreen = {
render: () => {
  // 로그인이 되어있지 않으면 페이지에 접근핳 수 없디.
  const { token } = getUserInfo();
    if(!token) {
      document.location.hash = '/signin';
    }
  return `<div>Home Screen</div>`
}
};

export default HomeScreen;