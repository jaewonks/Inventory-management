import { getUserInfo } from "../localStorage";

const Header = {
after_render: () => {

},  
render: () => {
  const { result } = getUserInfo();
  return `
  <div><a href='/#/'>Inventory Management System</a></div>
  <div>
  ${result ? `<a href='/#/profile'>${result[0].user_name}</a>` : `<a href='/#/signin'>Sign In</a>` }
  
  </div>
  `
}
};

export default Header