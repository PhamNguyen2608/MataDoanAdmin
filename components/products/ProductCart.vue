<template>
  <NuxtLink :to="`dong-ho/${slug}`" class="product-cart">
    <div class="product-cart__image">
      <img :src="image" alt="img" />
    </div>
    <div class="more">
      <span>THÊM VÀO GIỎ</span>
    </div>
    <div class="product-cart__info">
      <div class="text">
        <p>{{ brand }}</p>
        <h3>{{ name }}</h3>
      </div>
      <div class="price">
        <div class="price__current">
          <span>{{ formatPrice(price) }}</span>
        </div>
        <div class="price__old">
          <span>{{ formatPrice(priceOld) }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    image: String,
    name: String,
    brand: String,
    price: [String, Number],
    priceOld: [String, Number],
    slug: String,
    isActive: Boolean,
  },

  methods: {
    getUrl(img) {},
    formatPrice(price) {
      price = price.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      });
      return price;
    },
    // convertSlugProduct(title) {
    //   return title.split(" ").join("-").toLowerCase();
    // },
  },
};
</script>

<style lang="scss" scoped>
.product-cart {
  transition: all 0.3s ease;
  text-align: center;
  &__image {
    img {
      max-width: 100%;
    }
  }
  &__info {
    .text {
      p {
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        margin: 12px 0 0;
      }
      h3 {
        font-style: normal;
        font-weight: 400;
        padding: 0;
        margin: 12px 0 0;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        letter-spacing: 0.02em;
        color: #000;
        text-transform: uppercase;
      }
    }
    .price {
      padding: 12px 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      &__current {
        color: #161a21;
        letter-spacing: -0.02em;
        font-weight: 700;
        font-size: 14px;
        line-height: 14px;
      }
      &__old {
        letter-spacing: 0.02em;
        text-decoration-line: line-through;
        color: #161a21;
        font-size: 12px;
        line-height: 12px;
        opacity: 0.6;
        margin: 0 0 0 8px;
      }
    }
  }
  .more {
    opacity: 0;
    width: 100%;
    height: 50px;
    background: #ecebea;
    border: 2px solid #f8f7f4;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 0;
    font-weight: 700;
    line-height: 50px;
    color: $textColorDark;
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 15%) 0px 0px 40px;
    .more {
      opacity: 1;
    }
  }
}
</style>