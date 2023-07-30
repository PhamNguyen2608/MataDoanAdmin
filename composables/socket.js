import io from 'socket.io-client';

// Tạo kết nối Socket.IO tới server
// Đảm bảo rằng kết nối đã được thiết lập trước khi tạo ứng dụng Vue


export function initializeSocket() {
  const socket = io('http://localhost:8000'); // Thay đổi URL nếu cổng đã thay đổi

  // Replace 'http://your-server-ip:3000' with the actual URL of your Socket.IO server
  socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
  });
  // Socket.IO events and handling...
  return socket;
}