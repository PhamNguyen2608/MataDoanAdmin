<template>
  <section class="best-seller container">
    <h2 class="section-title">{{ titleSection }}</h2>
    <div class="see-all">
      <NuxtLink :to="slugCatProduct" class="see-all__link">
        <span>XEM TẤT CẢ</span>
        <img src="~/assets/img/right-arrow.png" alt="" />
      </NuxtLink>
    </div>
    <div class="best-seller__products">
      <ProductsProductCart
        v-for="watch in listWatch"
        :key="watch"
        :image="runtimeConfig.public.apiBase + watch.main_image"
        brand="KASHMIR"
        :name="watch.name"
        :priceOld="watch.old_price"
        :price="watch.new_price"
        :slug="watch.slug"
        :isActive="watch.is_active"
      />
    </div>
  </section>
</template>

<script>
import { useWatchStore } from "~/stores/watch";
export default {
  setup() {
    const runtimeConfig = useRuntimeConfig();
    const watchStore = useWatchStore();
    // expose to template and other options API hooks
    return {
      watchStore,
      runtimeConfig,
    };
  },
  props: {
    titleSection: String,
    slugCatProduct: String,
  },

  computed: {
    listWatch() {
      return this.watchStore.getStateModals;
    },
  },

  created() {
    const params = {
      page: 1,
      limit: 4,
    };
    console.log(this.watchStore);
    this.watchStore.getModals(params);
  },
};
</script>

<style lang="scss">
.best-seller {
  margin: 100px auto;
  .section-title {
    font-weight: 300;
    font-size: 32px;
    line-height: 32px;
    letter-spacing: 0.02em;
    padding: 0 0 28px;
    text-align: center;
    margin: 0;
    color: $textColorDark;
    text-transform: uppercase;
  }
  .see-all {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;
    &__link {
      display: flex;
      align-items: center;
      span {
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        text-align: center;
        letter-spacing: 0.02em;
        color: $textColorDark;
      }
      img {
        width: 13px;
        height: 6px;
        margin-left: 6px;
        filter: brightness(0);
        -webkit-filter: brightness(0);
        object-fit: cover;
      }
    }
  }
  &__products {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    .product-cart {
      width: calc(25% - 30px);
      margin: 0 15px;
      margin-bottom: 60px;
    }
  }
}
</style>