<template>
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Lượt truy cập tại các quốc gia</h4>
            <div class="row">
              <div class="col-md-5 ">
                <div class="table-responsive">
                  <table class="table">
                    <tbody>
                      <tr v-for="(country, index) in countries" :key="index">
                        <td>
                          <i class="flag-icon" :class="`flag-icon-${country.code}`"></i>
                        </td>
                        <td>{{ country.name }}</td>
                        <td class="text-right"> {{ country.visits }}</td>
                        <td class="text-right font-weight-medium"> {{ country.percentage }} </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-md-7">
                <div id="audience-map" class="vector-map"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import $ from 'jquery';

export default {
  data() {
    return {
      countries: [
        // { code: 'us', name: 'USA', visits: 1500, percentage: '60.35%' },
      ],
    };
  },
  methods: {
    updateCountries(dataTemp) {
      if (dataTemp.isActive) {
        const promises = dataTemp.ips.map((ip) => {
          const url = `https://geo.ipify.org/api/v2/country?apiKey=at_HZSu4YiWyrCy8BW7PzibJUtN5j5Ic&ipAddress=${ip}`;
          return fetch(url)
            .then((response) => response.json())
            .then((data) => {
              return {
                code: data.location.country.toLowerCase(),
                name: data.location.region,
                visits: dataTemp.ips.length,
                percentage: '60.35%',
              };
            })
            .catch((error) => {
              console.error('Error fetching IP information:', error);
              return null;
            });
        });

        Promise.all(promises).then((newCountryData) => {
          // Filter out any null entries in case of fetch errors
          const filteredData = newCountryData.filter((entry) => entry !== null);
          this.countries = [...this.countries, ...filteredData];
        });
      }else{
        this.countries =[];
      }
    },
  },
  created() {
    const socket = io('http://localhost:8000');

    // Đăng ký các sự kiện lắng nghe từ máy chủ
    socket.on('connect', () => {
      console.log('Connected to socket server!');
    });

    socket.on('receiveIPs', (data) => {
      this.updateCountries(data);
    });
  },
};
</script>


<style>
</style>

<style>
</style>
