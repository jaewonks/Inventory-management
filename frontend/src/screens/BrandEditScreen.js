import { getBrand, getCategories, updateBrand } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

export const BrandEditScreen = async (id, callback) => {
  // 로그인이 되어있지 않으면 페이지에 접근핳 수 없디.
  const { token } = getUserInfo();
    if(!token) {
      document.location.hash = '/signin';
    }
  const categories = await getCategories();
  const brand = await getBrand(id);
  /* const selects = document.querySelectorAll('#category > option');
  selects.forEach(select => {
    if(select.value === `${brand[0].category_id}`) {
      select.setAttribute('selected', '');
    }
  }); */
  
  document.getElementById('message-overlay').innerHTML =
  `
  <div class='content'>
      <div>
        <div class='form-container'>
          <form id='edit-product-form'>
            <ul class='form-items'>
              <li><h3>Edit Brand</h3></li>
              <li>
              <label for='category'>Category</label>
              <select name='category' id='category'>
              ${categories.map((category) => `
              <option value='${category.category_id}' id='${category.category_id}'
              ${category.category_id === brand[0].category_id ? 'selected':''}
              >${category.category_name}</option>
              `).join('\n')}
              }
              </select>
            </li>
              <li>
                <label for='brand'>Brand</label>
                <input type='text' name='brand' value='${brand[0].brand_name}' id='brand' />
              </li>
              <li>
                <button type='submit' class='primary'>Edit</button>
              </li>
            </ul>
          </form>
          <button id='message-overlay-close-button' class='close-button'>Close</button>
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
  const data = await updateBrand({
    id: id,
    category: document.getElementById('category').value,
    brand: document.getElementById('brand').value,
  })
  hideLoading();
  if(data.error) {
    showMessage(data.error)
  } else {
    history.go(0);
  }
});
};