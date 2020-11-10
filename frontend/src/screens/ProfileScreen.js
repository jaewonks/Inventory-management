import { getUserInfo } from "../localStorage";

const ProfileScreen = {
  render: () => {
    // 로그인이 되어있지 않으면 페이지에 접근핳 수 없디.
    const { token } = getUserInfo();
    if(!token) {
      document.location.hash = '/signin';
    } 
    return `<div>Profile Screen</div>`
    }
  };
  
  export default ProfileScreen;