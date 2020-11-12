import { createStock, getBrands, getCategories } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const StockAddScreen = {
  after_render: () => {
    document.getElementById('stock-add-form')
      .addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();
      const data = await createStock({
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
      if(data.message) {
        showMessage(data.message);
      } else {
        document.location.hash= '/stock';
      }
    }) 
  },
  render: async () => {
    const { token } = getUserInfo();
    if(!token) {
      document.location.hash = '/signin';
    } 
    const brands = await getBrands();

    return `
    <div class="stock-form-container">
    <form id="stock-add-form">
      <ul class="stock-form-items">
        <li>
          <h3>Add Stock</h3>
        </li>
        <li>
          <label for="code">Code</label>
          <input type="text" name="code"  id="code" value="code" />
        </li>
        <li>
          <label for="pn">Item No.</label>
          <input type="text" name="pn"  id="pn" value="pn" />
        </li>
        <li>
          <label for="name">Name</label>
          <input type="text" name="name"  id="name" value="name" />
        </li>
        <li>
          <label for="desc">DESC</label>
          <input type="text" name="desc" id="desc" value="desc" />
        </li>
        <li>
          <label for='category'>Category</label>
          <select name='category' id='category'>
          ${brands.map((brand) => {
            return `<option value='${brand.category_id}'>${brand.category_name}</option>`
          })}
          </select>
        </li>
        <li>
          <label for='brand'>Brand</label>
          <select name='brand' id='brand''>
          ${brands.map((brand) => {
            return `<option value='${brand.brand_id}'>${brand.brand_name}</option>`
          })}
          </select>
        </li>
        <li>
          <label for="qty">QTY</label>
          <input type="number" name="qty" id="qty" value="qty" />
        </li>
        <li>
          <label for="price">Price(£)</label>
          <input type="number" name="price" id="price" value="price" />
        </li>
        <li>
        <label for="location">Location</label>
        <input type="text" name="location" id="location" value="location" />
        </li>
        <li>
          <label for="purchaseAt">Purchase At</label>
          <input type="date" name="purchaseAt" id="purchaseAt" value="purchaseAt" />
        </li>
        <li>
          <label for="purchaseIn">Purchase In</label>
          <input type="text" name="purchaseIn" id="purchaseIn" value="purchaseIn" />
        </li>
        <li>
          <label for="purchaser">Purchaser</label>
          <input type="text" name="purchaser" id="purchaser" value="purchaser" />
        </li>
        <li>
          <label for="receipt">Receipt</label>
          <input type="text" name="receipt" id="receipt" value="receipt" />
        </li>
        <li>
          <label for="url">Ref. URL</label>
          <input type="text" name="url" id="url" value="url" />
        </li>
        <li>
          <label for="createdBy">Created By</label>
          <input type="text" name="createdBy" id="createdBy" value="createdBy" />
        </li>
        <li>
          <label for="createdAt">Created At</label>
          <input type="date" name="createdAt" id="createdAt" value="createdAt" />
        </li>

        <li>
          <button type="submit" class="primary">Add</button>
        </li>
      </ul>
    </form>
  </div>`
  }
};

export default StockAddScreen;