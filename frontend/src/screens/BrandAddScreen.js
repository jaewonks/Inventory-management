import { createBrand, getCategories } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

export const BrandAddScreen = async (message, callback) => {

  // 로그인이 되어있지 않으면 페이지에 접근핳 수 없디.
  const { token } = getUserInfo();
    if(!token) {
      document.location.hash = '/signin';
    }
  const categories = await getCategories();
  //console.log(categories);
  document.getElementById('message-overlay').innerHTML =
  `
  <div class='content'>
      <div>
        <div class='form-container'>
          <form id='Add-brand-form'>
            <ul class='form-items'>
              <li><h3>Add Brand</h3></li>
              <li>
              <label for='category'>Category</label>
              <select name='category' id='category'>
              ${categories.map((category) => {
                return `<option value='${category.category_id}'>${category.category_name}</option>`
              })}
              </select>
            </li>
              <li>
                <label for='brand'>Brand</label>
                <input type='text' name='brand' value='brand' id='brand' />
              </li>
              <li>
                <button type='submit' class='primary'>Add</button>
              </li>
                <button id='message-overlay-close-button' >Close</button>
            </ul>
          </form>
        </div>
      </div>
    </div>
  `;
  document.getElementById('message-overlay').classList.add('active');
  document.getElementById('message-overlay-close-button').addEventListener('click',
  () => {
    document.getElementById('message-overlay').classList.remove('active');
  })  
  if(callback) {
      callback();
  }
  document.getElementById('Add-brand-form')
    .addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading();
    const data = await createBrand({
      category: document.getElementById('category').value,
      brand: document.getElementById('brand').value
    });
    hideLoading();
    if (data.error) {
      showMessage(data.error);
    } else {
      history.go(0);
    };
  });



};