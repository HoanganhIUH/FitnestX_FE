// src/services/api.js
import axios from 'axios';

// Tạo instance axios với cấu hình chung
const API_URL = 'http://10.0.2.2:3000/api'; // Cho Android Emulator
// const API_URL = 'http://localhost:3000/api'; // Cho iOS Simulator hoặc web

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 giây timeout
});

// Interceptor để xử lý token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API Authentication
export const authAPI = {
  // Đăng ký tài khoản mới
  register: (userData) => {
    return api.post('/auth/register', userData);
  },
  
  // Xác thực OTP
  verifyOtp: (email, otp) => {
    return api.post('/auth/verify-otp', { email, otp });
  },
  
  // Gửi lại OTP
  resendOtp: (email) => {
    return api.post('/auth/resend-otp', { email });
  },
  
  // Đăng nhập
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  
  // Cập nhật thông tin hồ sơ
  updateProfile: (userData) => {
    return api.post('/auth/update-profile', userData);
  }
};

export default api;
