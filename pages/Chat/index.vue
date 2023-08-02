<template>
  <div class="container">
    <div class="chat-list">
      <div
        class="chat-user"
        v-for="chatData in chats.data"
        :key="chatData.chat._id"
        @click="loadChat(chatData)"
      >
        <img :src="chatData.avatar" alt="User Avatar" class="user-avatar" />
        <div class="user-info">
          <p class="user-name">{{ chatData.name }}</p>
          <p class="user-last-message">{{ chatData.chat.latestMessage }}</p>
          <!-- Thêm chỉ báo isNew tại đây -->
          <span v-if="chatData.chat.isNew" class="new-indicator">Mới</span>
        </div>
      </div>
    </div>
    <div class="chat-content">
      <div class="messages">
        <div v-if="currentChat && currentChat.messages">
          <div v-for="message in currentChat.messages" :key="message._id" :class="message.sentByAdmin ? 'admin-message' : 'user-message'">
            <p>{{ message.content }}</p>
          </div>
        </div>
      </div>
      <div class="input-container">
        <input type="text" v-model="inputMessage" placeholder="Enter your message" />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
  return {
    chats: { data: [] }, // Chứa danh sách cuộc trò chuyện
    currentChat: null,
    inputMessage: '',
    adminId: '64c7b47b81b4edd33e3b7cf2'
  };
},

  created() {
    this.fetchChats();
    this.startPolling(); 
  },
  methods: {
  async fetchChats() {
  const token = Cookies.get('token');
  try {
    const response = await axios.get('http://localhost:8000/api/v1/adminChat/getAllChat', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'admin-id': this.adminId
      }
    });
    this.chats = response.data;
    console.log('chats: ', this.chats);
    this.chats.data.sort((a, b) => new Date(b.chat.updatedAt) - new Date(a.chat.updatedAt)); // Sắp xếp cuộc trò chuyện
  } catch (error) {
    console.error('An error occurred while fetching the chats:', error);
  }
},
sendMessage() {
  console.log("123")
  // Kiểm tra xem có tin nhắn để gửi không
  if (!this.inputMessage.trim()) return;

  if (!this.currentChat || !this.currentChat.chat._id) {
    console.error('No chat selected or chat ID is missing');
    return;
  }
   console.log("currentChat:", this.currentChat); 
  // Lấy ID của cuộc trò chuyện hiện tại và userId
  const chatId = this.currentChat.chat._id;
  const userId = this.currentChat.chat.userId._id;// Chắc chắn rằng userId được lưu trong currentChat
console.log("userId:", userId); // In giá trị userId ra console
  // Lấy token từ cookie hoặc bất kỳ nơi nào bạn lưu trữ
  const token = Cookies.get('token'); 

  // Gửi yêu cầu POST đến API với nội dung tin nhắn, userId và ID của cuộc trò chuyện
  axios
    .post(`http://localhost:8000/api/v1/adminChat/adminSend`, {
      content: this.inputMessage,
      userId: userId // Thêm userId vào body của yêu cầu
    
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      // Xử lý phản hồi, ví dụ thêm tin nhắn vào danh sách hiện tại
      this.currentChat.messages.push({
        content: this.inputMessage,
        sentByAdmin: true
      });

      // Xóa trường nhập
      this.inputMessage = '';
    })
    .catch(error => {
      console.error('Error sending message:', error);
      // Xử lý lỗi nếu cần
    });
},

loadChat(chatData) {
  console.log('chatData: ', chatData);
  chatData.chat.isNew = false; // Đặt cờ isNew trong chat thành false khi tin nhắn được xem
  this.updateChatNewStatus(chatData.chat._id, false); // Gọi API để cập nhật trạng thái isNew
  this.currentChat = chatData;
},




    
    
async fetchMessages() {
  if (!this.currentChat) return;
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/adminChat/getChatDetails/${this.currentChat.chat._id}`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
        'admin-id': this.adminId
      }
    });
    this.currentChat.messages = [...response.data.data.messages];

    // Lưu trữ trạng thái isNew hiện tại
    const currentIsNewStatus = this.chats.data.map(chat => chat.chat.isNew);
    
    await this.fetchChats(); // Gọi lại để sắp xếp lại danh sách cuộc trò chuyện

    // Khôi phục trạng thái isNew
    this.chats.data.forEach((chat, index) => {
      chat.chat.isNew = currentIsNewStatus[index];
    });

  } catch (error) {
    console.error('An error occurred while fetching the messages:', error);
  }
},

async updateChatNewStatus() {
  const token = Cookies.get('token');

  // Lặp qua tất cả cuộc trò chuyện để kiểm tra trạng thái mới
  for (let chatData of this.chats.data) {
    try {
      const chatId = chatData.chat._id; // Lấy chatId từ dữ liệu chat hiện tại
      const isNewStatus = chatData.chat.isNew; // Lấy trạng thái isNew từ dữ liệu chat hiện tại

      // Kiểm tra xem trạng thái isNew có thay đổi hay không
      // Giả sử chúng ta đã lưu trạng thái isNew trước đó trong chatData.chat.previousIsNew
      if (isNewStatus !== chatData.chat.previousIsNew) {
        // Gửi yêu cầu PATCH với chatId trong URL và isNew trong thân yêu cầu
        await axios.patch(`http://localhost:8000/api/v1/adminChat/mark-as-read/${chatId}`, {
          isNew: isNewStatus
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'admin-id': this.adminId
          }
        });
        
        // Cập nhật trạng thái isNew trước đó
        chatData.chat.previousIsNew = isNewStatus;
      }
    } catch (error) {
      console.error('An error occurred while updating the isNew status:', error);
    }
  }
}
,





    startPolling() {
      setInterval(() => {
        this.fetchMessages();
        this.updateChatNewStatus();
      }, 2000);
    },
  },
};
</script>


  
  <style>
  .new-indicator {
  background-color: rgb(126, 214, 93);
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 0.8em;
}

  .admin-message,
.user-message {
  max-width: 70%; /* Giới hạn chiều rộng của tin nhắn */
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
}

.admin-message {
  text-align: right;
  background-color: #007bff;
  float: right; /* Đẩy tin nhắn admin sang phải */
  clear: both; /* Làm sạch float để các tin nhắn không chồng lên nhau */
}

.user-message {
  color: black;
  text-align: left;
  background-color: #e1e1e1;
  float: left; /* Đẩy tin nhắn người dùng sang trái */
  clear: both; /* Làm sạch float để các tin nhắn không chồng lên nhau */
}

  .container {
  display: flex;
  width: 100%;
  height: 85vh;
}

.chat-list {
  width: 25%;
  border-right: 1px solid #ccc;
  padding: 15px;
  overflow-y: auto;
}

.chat-user {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.chat-user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.chat-content {
  width: 75%;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  border-bottom: 1px solid #ccc;
}

.input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.input-container input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
}

.input-container button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.input-container button:hover {
  background-color: #0056b3;
}
.chat-user {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }

  .chat-user .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .user-name {
    margin: 0;
  }

  .user-last-message {
    margin: 0;
    font-size: 0.8em;
    color: #888;
  }

  </style>
  