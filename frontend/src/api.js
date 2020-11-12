import { apiUrl } from './config.js';
import axios from 'axios';
import { getUserInfo } from './localStorage.js';

export const signin = async ({email, password}) => {
  try { 
    const response = await axios({
      url: `${apiUrl}/api/users/signin`,
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      data: {
        email, password
      }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message)
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error : err.response.data.message || err.message }
  }  
};

export const signup = async ({name, email, password}) => {
  try { //서버로부터 온 응답에 대한 처리
    const response = await axios({
      url: `${apiUrl}/api/users/signup`,
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      data: {
        name, email, password
      }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message)
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error : err.response.data.message || err.message }
  } 
};

export const getUsers = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/users`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getStock = async (id) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getStocks = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const createStock = async ({
  code,
  pn,
  name,
  desc,
  qty,
  price,
  location,
  purchaseAt,
  purchaseIn,
  purchaser,
  receipt,
  url,
  createdBy,
  createdAt,
  category,
  brand
  }) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/add`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }, data: { 
        code,
        pn,
        name,
        desc,
        qty,
        price,
        location,
        purchaseAt,
        purchaseIn,
        purchaser,
        receipt,
        url,
        createdBy,
        createdAt,
        category,
        brand
      }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
}

export const updateStock = async (stock) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/${stock.id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }, 
      data: {
        stock
      }  
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    return { error: err.response.data.message || err.message };
  };
};

export const deleteStock = async (stock_id) => {
  try {
    const { token } =getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/${stock_id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }, 
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    return { error: err.response.data.message || err.message };
  }
}; 

export const uploadFile = async (formData) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/uploads`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    } else {
      return response.data;
    }
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const getCategory = async (id) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/category/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getCategories = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/category`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getBrand = async (id) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/brand/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getBrands = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/brand`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const createBrand = async ({category, brand}) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/brand`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }, data: { category, brand }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const updateBrand = async (brand) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/brand/${brand.id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }, 
      data: brand, category,
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    return { error: err.response.data.message || err.message };
  };
};

export const deleteBrand = async (brand_id) => {
  try {
    const { token } =getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/brand/${brand_id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }, 
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    return { error: err.response.data.message || err.message };
  }
};  

export const createCategory = async ({name}) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/category`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }, data: { name }
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const updateCategory = async (category) => {
  try {
    const { token } =getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/category/${category.id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }, 
      data: category,
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    return { error: err.response.data.message || err.message };
  };
};

export const deleteCategory = async (category_id) => {
  try {
    const { token } =getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/stocks/category/${category_id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }, 
    });
    if(response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(err) {
    return { error: err.response.data.message || err.message };
  };
};