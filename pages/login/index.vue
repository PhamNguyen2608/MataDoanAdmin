<template>
  <div class="content-wrapper">
    <div class="background"></div>
    <div v-if="!isLoggedIn" class="login-container">
      <div class="login-form">
        <img src="logo-mata.png" alt="Logo Mata" class="logo"/>
        <input type="email" v-model="email" placeholder="Email"/>
        <input type="password" v-model="password" placeholder="Password"/>
        <button @click="onLogin">Đăng nhập</button>
      </div>
    </div>
    <div v-if="isLoggedIn">
      <!-- Nội dung của bạn ở đây -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Cookies from 'js-cookie';

export default {
  data() {
    return {
      isLoggedIn: false,
      email: '',
      password: ''
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/users/login', {
          email: this.email,
          password: this.password
        });
        if (response.data.status === 'success') {
          this.isLoggedIn = true;
          console.log('isLoggedIn: ', this.isLoggedIn);
          
          // Lưu token vào cookie
          Cookies.set('token', response.data.data.token);
          
        } else {
          alert('Thông tin đăng nhập không chính xác!');
        }
      } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        alert('Có lỗi xảy ra khi đăng nhập, vui lòng thử lại!');
      }
    }
  }
};
</script>


<style>
.background {
  filter: blur(5px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  z-index: 0;
}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.login-form {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}
</style>
