import { parseRequestUrl } from './utils.js';
import Header from './components/Header.js';
import Nav from './components/Nav.js';
import HomeScreen from './screens/HomeScreen.js';
import StockListScreen from './screens/StockListScreen.js';
import StockAddScreen from './screens/StockAddScreen.js';
import StockEditScreen from './screens/stockEditScreen.js';
import Error404Screen from './screens/Error404Screen.js'
import SigninScreen from './screens/SigninScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import UserListScreen from './screens/UserListScreen.js';
import CategoryScreen from './screens/CategoryScreen.js';
import BrandScreen from './screens/BrandScreen.js';
import LocationScreen from './screens/locationScreen.js';

const routes = {
  '/': HomeScreen,
  '/signin' : SigninScreen,
  '/signup' : SignupScreen,
  '/user' : UserListScreen,
  '/profile' : ProfileScreen,
  '/category' : CategoryScreen,
  '/brand' : BrandScreen,
  '/location' : LocationScreen,
  '/stock' : StockListScreen,
  '/stockadd' : StockAddScreen,
  '/stock/:id/edit' : StockEditScreen
}

 const router = async () => {
  const request = parseRequestUrl() //url을 분석하는 코드
  const parseUrl = 
      (request.resource ? `/${request.resource}` : '/') +
      (request.id ? '/:id' : '') +
      (request.verb ? `/${request.verb}` : '');
   // header
   const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    if(Header.after_render) await Header.after_render();
   // Nav
   const nav = document.getElementById('nav-container');
   nav.innerHTML = await Nav.render();
   if(nav.after_render) await Nav.after_render();
  // 404 page
  const screen = routes[parseUrl]? routes[parseUrl]: Error404Screen;
  // main - 각페이지들을 screen으로 받는다.
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if(screen.after_render) await screen.after_render();
 };

//load event
window.addEventListener('load', router);
//hashchange event
window.addEventListener('hashchange', router);