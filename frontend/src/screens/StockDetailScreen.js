import { getStock } from "../api.js";
import { getUserInfo } from "../localStorage.js";

export const StockDetailScreen = async (id, callback) => {
  // 로그인이 되어있지 않으면 페이지에 접근핳 수 없디.
  const { token } = getUserInfo();
    if(!token) {
      document.location.hash = '/signin';
    }
  const stock = await getStock(id); 
  const puchasedDate = stock[0].stock_buy_at.substring(0,10);
  const createdDate = stock[0].stock_created_at.substring(0,10);
  
  document.getElementById('message-overlay').innerHTML =
 `
 <div class='detailboard'>
    <div class='detailboard-content'>
      <div class='headtitle'>
        <h3>Stock Details</h3>
      </div>
      <div class='order-list'>
        <table>
          <thead>
          <tr>
            <th>Code</th>
            <th>Item No.</th>
          </tr>  
          <tr>
            <td>${stock[0].stock_no}</td>
            <td>${stock[0].stock_pno}</td>
          </tr>
          <tr>
            <th>Item Name</th>
          </tr>  
          <tr>
            <td>${stock[0].stock_name}</td>
          </tr>
          <tr>
            <th>Category</th>
            <th>Brand</th>
          </tr>
          <tr>
            <td>${stock[0].category_name}</td>
            <td>${stock[0].brand_name}</td>
          </tr>  
          <tr>
            <th>Descrition</th>
          </tr>
          <tr>
            <td>${stock[0].stock_desc}</td>
          </tr>
          <tr>
            <th>Qty</th>
            <th>Location</th>
          </tr>
          <tr>
            <td>${stock[0].stock_qty}</td>
            <td>${stock[0].stock_location}</td>
          </tr>
          <tr>
            <th>Price(£)</th>
            <th>Purchased At</th>
          </tr>
          <tr>
            <td>${stock[0].stock_price}</td>
            <td>${puchasedDate}</td>
          </tr>
          <tr>
            <th>Purchased In</th>
            <th>Purchased By</th>
          </tr>
          <tr>
            <td>${stock[0].stock_buy_in}</td>
            <td>${stock[0].stock_buy_by}</td>
          </tr>
          <tr>
            <th>Url</th>
            <th>Created By</th>
          </tr>
          <tr>
            <td>${stock[0].stock_url}</td>
            <td>${stock[0].stock_created_by}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>${createdDate}</td>
            <td>${stock[0].stock_status}</td>
          </tr>
          <tr>
            <th>Receipt</th>
          </tr>  
          <tr>
            <td>${stock[0].stock_receipt}</td>
          </tr>
        </table>
        </div>
        <button id='message-overlay-close-button' class='closeBtn detail'>Close</button>
        </div>
  </div>`;
document.getElementById('message-overlay').classList.add('active');
document.getElementById('message-overlay-close-button').addEventListener('click',
() => {
  document.getElementById('message-overlay').classList.remove('active');
})  
if(callback) {
    callback();
}
};
