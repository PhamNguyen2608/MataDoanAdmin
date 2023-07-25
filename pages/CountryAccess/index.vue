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
export default {
  data() {
    return {
      countries: [
        {code: 'us', name: 'USA', visits: 1500, percentage: '60.35%'},
        {code: 'de', name: 'Germany', visits: 800, percentage: '33.25%'},
        {code: 'au', name: 'Australia', visits: 760, percentage: '15.45%'},
        {code: 'gb', name: 'United Kingdom', visits: 450, percentage: '25.00%'},
        {code: 'ro', name: 'Romania', visits: 620, percentage: '10.25%'},
        {code: 'br', name: 'Brasil', visits: 230, percentage: '75.00%'},
      ]
    }
  },
}
</script>

<style>
</style>
