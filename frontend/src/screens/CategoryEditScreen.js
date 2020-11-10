import { getCategory, updateCategory } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

export const CategoryEditScreen = async (id, callback) => {
  
  // 로그인이 되어있지 않으면 페이지에 접근핳 수 없디.
  const { token } = getUserInfo();
    if(!token) {
      document.location.hash = '/signin';
    } 
  const category = await getCategory(id);
  document.getElementById('message-overlay').innerHTML =
  `
  <div class='content'>
      <div>
        <div class='form-container'>
          <form id='edit-product-form'>
            <ul class='form-items'>
              <li><h3>Edit Category</h3></li>
              <li>
                <label for='name'>Category</label>
                <input type='text' name='name' value='${category[0].category_name}' id='name' />
              </li>
              <li>
                <button type='submit' class='primary'>Update</button>
              </li>
            </ul>
          </form>
          <button id='message-overlay-close-button' class='closeBtn'>Close</button>
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

  document.getElementById('edit-product-form')
  .addEventListener('submit', async(e) => {
    e.preventDefault();
    showLoading();
    const data = await updateCategory({
      id: id,
      name: document.getElementById('name').value
    })
    //console.log(data.name);
    hideLoading();
    if(data.error) {
      showMessage(data.error)
    } else {
      history.go(0);
    }
  });
};