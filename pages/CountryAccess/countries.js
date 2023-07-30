// import io from 'socket.io-client';
// import $ from 'jquery';
// const socket = io('http://localhost:8000');

// // Đăng ký các sự kiện lắng nghe từ máy chủ
// socket.on('connect', () => {
//   console.log('Connected to socket server!');
// });

// let countries = [
//   { code: 'us', name: 'USA', visits: 1500, percentage: '60.35%' },
// ];
// socket.on("receiveIPs",({ips,isActive})=>{
//   ips.map((ip)=>{
//     const url =
//       `https://geo.ipify.org/api/v2/country?apiKey=at_HZSu4YiWyrCy8BW7PzibJUtN5j5Ic&ipAddress=${ip}`;
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("concu",data);
//         countries.push({
//           code: data.location.country,
//           name: data.location.region,
//           visits: ips.length,
//           percentage: '60.35%'
//         })
//       })
//       .catch((error) => {
//         console.error('Error fetching IP information:', error);
//       });
//   })
// })
// // Dữ liệu về quốc gia


// export default countries;
