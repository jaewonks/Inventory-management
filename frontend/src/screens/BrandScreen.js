import { deleteBrand, getBrands } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, rerender, showLoading, showMessage } from "../utils.js";
import { BrandAddScreen } from "./BrandAddScreen.js";
import { BrandEditScreen } from "./BrandEditScreen.js";

const BrandScreen = {
after_render: async () => {
  document.getElementById('add_brand')
  .addEventListener('click', () => {
    BrandAddScreen();
  });

  const editButtons = document.getElementsByClassName('edit-button');
  Array.from(editButtons).map((editButton) => {
    editButton.addEventListener('click', () => {
      BrandEditScreen(editButton.id);
    })
  });

  const deleteButtons =  document.getElementsByClassName('delete-button');  
  Array.from(deleteButtons).map(deleteButton => {
    deleteButton.addEventListener('click', async () => {
      if(confirm('Are you sure to delete this brand?')) {
        showLoading();
        const data = await deleteBrand(deleteButton.id);
        if(data.error) {
          showMessage(data.error);
        } else {
          rerender(BrandScreen);
        }
        hideLoading();
      }
      history.go(0);
    })
  });
},
render: async () => {
  // 로그인이 되어있지 않으면 페이지에 접근핳 수 없디.
  const { token } = getUserInfo();
  if(!token) {
    document.location.hash = '/signin';
  } 
  const brands = await getBrands();
  return `
  <div class='dashboard'>
    <div class='dashboard-content'>
      <div class='headtitle'>
        <h3>Brand</h3>
        <button id='add_brand'>ADD</button>
      </div>
      <div class='order-list'>
        <table>
          <thead>
            <th>ID</th>
            <th>Category</th>
            <th>Brand</th>
            <th class='statusTh'>Status</th>
            <th class='tr-action'>ACTION</th>
          </thead>
          <tbody>
          ${brands.map((brand) => 
            `<tr>
              <td>${brand.brand_id}</td>
              <td>${brand.category_name}</td>
              <td>${brand.brand_name}</td>
              <td><button class='statusBtn'>${brand.brand_status}</button></td>
              <td>
              <button id='${brand.brand_id}' class='edit-button'>Edit</button>
              <button id='${brand.brand_id}' class='delete-button'>Delete</button>
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

export default BrandScreen;