<template>
  <div class="policies">
    <div class="container">
      <div class="policies__item">
        <div class="policies__item--icon">
          <img src="~/assets/img/shipped.png" alt="" />
        </div>
        <span class="policies__item--desc"> FREESHIP ĐƠN HÀNG >700K </span>
      </div>
      <div class="policies__item">
        <div class="policies__item--icon">
          <img src="~/assets/img/verified.png" alt="" />
        </div>
        <span class="policies__item--desc"> BẢO HÀNH 10 NĂM </span>
      </div>
      <div class="policies__item">
        <div class="policies__item--icon">
          <img src="~/assets/img/package.png" alt="" />
        </div>
        <span class="policies__item--desc">
          ĐỔI TRẢ MIỄN PHÍ TRONG VÒNG 3 NGÀY
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.policies {
  padding: 18px 0;
  background: #ecebea;
  .container {
    display: flex;
    align-items: center;
    .policies__item {
      width: calc(100% / 3);
      display: flex;
      align-items: center;
      justify-content: center;
      &--icon {
        margin-right: 8px;
        img {
          height: 20px;
          width: auto;
        }
      }
      &--desc {
        font-size: 12px;
      }
    }
  }
}
</style>