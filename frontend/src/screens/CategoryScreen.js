import { createCategory, deleteCategory, getCategories } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage, rerender } from "../utils.js";
import { CategoryEditScreen } from "./CategoryEditScreen.js";

const CategoryScreen = {
after_render: async () => {
  document.getElementById('add-cat-form')
    .addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading();
    const data = await createCategory({
      name: document.getElementById('name').value
    });
    hideLoading();
    if (data.error) {
      showMessage(data.error);
    } else {
      history.go(0);
    };
  });

  const editButtons = document.getElementsByClassName('edit-button');
  Array.from(editButtons).forEach((editButton) => {
    editButton.addEventListener('click', () => {
      CategoryEditScreen(editButton.id);
    });
  }); 
  
  const deleteButtons = document.getElementsByClassName('delete-button');
  Array.from(deleteButtons).forEach(deleteButton => {
    deleteButton.addEventListener('click', async () => {
      if(confirm('Are you sure to delete this category?')) {
        showLoading();
        const data = await deleteCategory(deleteButton.id);
        if(data.error) {
          showMessage(data.error);
        } else {
          rerender(CategoryScreen);
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
  const categories = await getCategories();
  return `
  <div class='dashboard'>
    <div class='dashboard-content'>
      <div class='headtitle'>
        <h3>Category</h3>
        <form id='add-cat-form'>
          <input type='text' name='name' id='name' /><!--
          --><button type='submit'>ADD</button>
        </form>
      </div>
      <div class='order-list'>
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th class='statusTh'>Status</th>
            <th class='tr-action'>ACTION</th>
          </thead>
          <tbody>
          ${categories.map((category) => 
            `<tr>
              <td>${category.category_id}</td>
              <td data-editable >${category.category_name}</td>
              <td><button class='statusBtn'>${category.category_status}</button></td>
              <td>
              <button id='${category.category_id}' class='edit-button'>Edit</button>
              <button id='${category.category_id}' class='delete-button'>Delete</button>
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

export default CategoryScreen;

