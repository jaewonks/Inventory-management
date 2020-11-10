import { getBrands, getCategories, getStock, updateStock } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage, parseRequestUrl } from "../utils.js";

export const StockEditScreen = {
after_render: () => {
  const request = parseRequestUrl();
  document.getElementById('stock-edit-form')
    .addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading();
    const data = await updateStock({
      id: request.id,
      code: document.getElementById('code').value,
      pn: document.getElementById('pn').value,
      name: document.getElementById('name').value,
      desc: document.getElementById('desc').value,
      qty: document.getElementById('qty').value,
      price: document.getElementById('price').value,
      location: document.getElementById('location').value,
      purchaseAt: document.getElementById('purchaseAt').value,
      purchaseIn: document.getElementById('purchaseIn').value,
      purchaser: document.getElementById('purchaser').value,
      receipt: document.getElementById('receipt').value,
      url: document.getElementById('url').value,
      createdBy: document.getElementById('createdBy').value,
      createdAt: document.getElementById('createdAt').value,       
      category: document.getElementById('category').value,
      brand: document.getElementById('brand').value
    });
    hideLoading();
    if(data.err) {
      showMessage(data.err);
    } else {
      document.location.hash= '/stock';
    }
  }) 
},
render: async () => {
  const { token } = getUserInfo();
    if(!token) {
      document.location.hash = '/';
    }
  const request = parseRequestUrl();  
  const categories = await getCategories();
  const brands = await getBrands();  
  const stock = await getStock(request.id);
  const puchasedDate = stock[0].stock_buy_at.substring(0,10);
  const createdDate = stock[0].stock_created_at.substring(0,10);
 
  return `
  <div class="stock-form-container">
    <form id="stock-edit-form">
      <ul class="stock-form-items">
        <li>
          <h3>Edit Stock</h3>
        </li>
        <li>
          <label for="code">Code</label>
          <input type="text" name="code"  id="code" value="${stock[0].stock_no}" />
        </li>
        <li>
          <label for="pn">Item No.</label>
          <input type="text" name="pn"  id="pn" value="${stock[0].stock_pno}" />
        </li>
        <li>
          <label for="name">Name</label>
          <input type="text" name="name"  id="name" value="${stock[0].stock_name}" />
        </li>
        <li>
          <label for="desc">DESC</label>
          <input type="text" name="desc" id="desc" value="${stock[0].stock_desc}" />
        </li>
        <li>
          <label for="category">category</label>
          <select name='category' id='category'>
          ${categories.map((category) => `
          <option value='${category.category_id}' id='${category.category_id}'>${category.category_name}</option>
          `).join('\n')}
          </select>
        </li>
        <li>
          <label for="brand">Brand</label>
          <select name='brand' id='brand'>
          ${brands.map((brand) => `
          <option value='${brand.brand_id}' id='${brand.brand_id}'>${brand.brand_name}</option>
          `).join('\n')}
          </select>
        </li>
        <li>
          <label for="qty">QTY</label>
          <input type="number" name="qty" id="qty" value="${stock[0].stock_qty}" />
        </li>
        <li>
          <label for="price">Price(£)</label>
          <input type="number" name="price" id="price" value="${stock[0].stock_price}" />
        </li>
        <li>
        <label for="location">Location</label>
        <input type="text" name="location" id="location" value="${stock[0].stock_location}" />
        </li>
        <li>
          <label for="purchaseAt">Purchase At</label>
          <input type="date" name="purchaseAt" id="purchaseAt" value="${puchasedDate}" />
        </li>
        <li>
          <label for="purchaseIn">Purchase In</label>
          <input type="text" name="purchaseIn" id="purchaseIn" value="${stock[0].stock_buy_in}" />
        </li>
        <li>
          <label for="purchaser">Purchaser</label>
          <input type="text" name="purchaser" id="purchaser" value="${stock[0].stock_buy_by}" />
        </li>
        <li>
          <label for="receipt">Receipt</label>
          <input type="text" name="receipt" id="receipt" value="${stock[0].stock_receipt}" />
        </li>
        <li>
          <label for="url">Ref. URL</label>
          <input type="text" name="url" id="url" value="${stock[0].stock_url}" />
        </li>
        <li>
          <label for="createdBy">Created By</label>
          <input type="text" name="createdBy" id="createdBy" value="${stock[0].stock_created_by}" />
        </li>
        <li>
          <label for="createdAt">Created At</label>
          <input type="date" name="createdAt" id="createdAt" value="${createdDate}" />
        </li>
        <li>
          <button type="submit" class="primary">Edit</button>
          <button onclick="goBack()">Back to the list</button>
        </li>
      </ul>
    </form>
  </div>
  `;
} 
};

export default StockEditScreen;
  

