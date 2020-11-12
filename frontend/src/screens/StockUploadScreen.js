import { uploadFile } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

export const StockUploadScreen = async (message, callback) => {
  const { token } = getUserInfo();
    if(!token) {
      document.location.hash = '/signin';
    }

  document.getElementById('message-overlay').innerHTML =
  `
  <div class='content'>
      <div>
        <div class='form-container'>
          <form id='Add-file-form'>
            <ul class='form-items'>
              <li><h3>Upload File</h3></li>
              <li>
                <label for='file'>File</label>
                <input type='file' name='file' id='file' />
              </li>
              <li>
                <button type='submit' class='primary'>Upload</button>
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

  document.getElementById('file').addEventListener('change', async (e) => {
    const file = e.target.files[0]; //한개의 파일만 가져오므로..
    const formData = new FormData(); // 배열 생성
    formData.append('file', file); //선택한 요소 '내부'의 '끝부분'에 삽입
    showLoading();
    const data = await uploadFile(formData);
    hideLoading();
    if(data.error) {
      showMessage(data.error);
    } else {
      showMessage('File uploaded successfully.');
    }
    })
};

