import { getStocks, deleteStock } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, rerender, showLoading, showMessage } from "../utils.js";
import { StockDetailScreen } from "./StockDetailScreen.js";

const StockListScreen = {
after_render: async () => {
  document.getElementById('add_stock')
  .addEventListener('click', () => {
  document.location.hash = '/stockadd';
});

const detailButtons = document.getElementsByClassName('detail-button');
Array.from(detailButtons).map((detailButton) => {
  detailButton.addEventListener('click', () => {
    StockDetailScreen(detailButton.id);
  })
});

const editButtons = document.getElementsByClassName('edit-button');
Array.from(editButtons).map((editButton) => {
  editButton.addEventListener('click', () => {
    document.location.hash = `/stock/${editButton.id}/edit`;
  })
});  

const deleteButtons = document.getElementsByClassName('delete-button');
Array.from(deleteButtons).map((deleteButton) => {
  deleteButton.addEventListener('click', () => {
    if(confirm('Are you sure to delete this stock?')) {
      showLoading();
      const data = deleteStock(deleteButton.id);
      if(data.error) {
        showMessage(data.error);
      } else {
        rerender(StockListScreen);
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
    document.location.hash = '/stock';
  } 
  const stocks = await getStocks();
  return `
  <div class='dashboard'>
    <div class='dashboard-content'>
      <div class='headtitle'>
        <h3>Stock List</h3>
        <button id='add_stock'>ADD</button>
      </div>
      <div class='order-list'>
        <table>
          <thead>
            <th>ID</th>
            <th>Code</th>
            <th>Item No.</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Qty</th>
            <th>Location</th>
            <th class='statusTh'>Status</th>
            <th class='tr-action'>ACTION</th>
          </thead>
          <tbody>
          ${stocks.map((stock) => 
            `<tr>
              <td>${stock.stock_id}</td>
              <td>${stock.stock_no}</td>
              <td>${stock.stock_pno}</td>
              <td>${stock.stock_name}</td>
              <td>${stock.brand_name}</td>
              <td>${stock.category_name}</td>
              <td>${stock.stock_qty}</td>
              <td>Location</td>
              <td><button class='statusBtn'>${stock.stock_status}</button></td>
              <td>
              <button id='${stock.stock_id}' class='detail-button'>Details</button>
              <button id='${stock.stock_id}' class='edit-button'>Edit</button>
              <button id='${stock.stock_id}' class='delete-button'>Delete</button>
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

export default StockListScreen; 

/*   <th>ID</th>
  <th>Code</th>
  <th>Item No.</th>
  <th>Name</th>
  <th>DESC</th>
  <th>category</th>
  <th>Brand</th>
  <th>Qty</th>
  <th>Price</th>
  <th>Purchase At</th>
  <th>Purchase In</th>
  <th>Purchaser</th>
  <th>Location</th>
  <th>Receipt</th>
  <th>Created By</th>
  <th>Created At</th> */