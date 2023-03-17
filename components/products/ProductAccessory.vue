<template>
  <div class="accessory" :class="{ active: isAddAcc }">
    <div class="accessory__image">
      <img src="~/assets/img/products/cuff-jackie-gun-shadow.jpg" alt="" />
    </div>
    <div class="accessory__info">
      <p class="accessory__info__name">JACKIE GUNMETAL</p>
      <div class="accessory__info__price">
        <span class="price__sale">399.000đ</span>
        <span class="price__current">+319.200đ</span>
      </div>
    </div>
    <button class="btn__add" @click="addAccessory()">
      {{ textBtnAccessory }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textBtnAccessory: "+THÊM",
      isAddAcc: false,
    };
  },
  methods: {
    addAccessory() {
      this.isAddAcc = !this.isAddAcc;
      if (this.isAddAcc) {
        this.textBtnAccessory = "ĐÃ THÊM";
      } else {
        this.textBtnAccessory = "+THÊM";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.accessory {
  width: 50%;
  margin: 0 10px;
  border: 1px solid #ecebea;
  border-radius: 100px 100px 0 0;
  &.active {
    border: 1px solid #53c66e;
    .btn__add {
      background: #53c66e;
      color: #fff;
    }
  }
  &__image {
    img {
      width: 100px;
      height: 100px;
    }
  }
  &__info {
    &__name {
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.02em;
      color: $textColorDark;
      margin: 0;
      padding: 30px 0 8px;
      text-transform: uppercase;
      text-align: center;
    }
    &__price {
      font-weight: 500;
      font-size: 12px;
      line-height: 12px;
      display: grid;
      justify-content: center;
      letter-spacing: 0.02em;
      color: #161a21;
      margin: 0;
      padding: 0 0 15px;
      .price__sale {
        opacity: 0.6;
        text-decoration: line-through;
        padding: 3px 0px;
      }
    }
  }
  .btn__add {
    border: none;
    background: #ecebea;
    font-weight: 700;
    font-size: 12px;
    line-height: 12px;
    display: flex;
    letter-spacing: 0.02em;
    color: $textColorDark;
    padding: 6px 0;
    width: 100%;
    justify-content: center;
    cursor: pointer;
  }
}
</style>