<template>
  <section class="categories container">
    <div class="categories__item">
      <div class="categories__item--image">
        <img src="~/assets/img/categories-man.jpg" alt="" />
      </div>
      <nuxt-link to="/categories/man" class="categories__item--link">
        <span>ĐỒNG HỒ NAM</span>
        <div class="icon">
          <img src="~/assets/img/right-arrow.png" alt="" />
        </div>
      </nuxt-link>
    </div>
    <div class="categories__item">
      <div class="categories__item--image">
        <img src="~/assets/img/categories-woman.jpg" alt="" />
      </div>
      <nuxt-link to="/categories/man" class="categories__item--link">
        <span>ĐỒNG HỒ NỮ</span>
        <div class="icon">
          <img src="~/assets/img/right-arrow.png" alt="" />
        </div>
      </nuxt-link>
    </div>
    <div class="categories__item">
      <div class="categories__item--image">
        <img src="~/assets/img/categories-accessory.jpg" alt="" />
      </div>
      <nuxt-link to="/categories/man" class="categories__item--link">
        <span>PHỤ KIỆN</span>
        <div class="icon">
          <img src="~/assets/img/right-arrow.png" alt="" />
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.categories {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "cat1 cat2 cat3";
  justify-content: space-around;
  column-gap: 3px;
  padding: 30px 0;
  &__item {
    height: 260px;
    // width: calc(100% / 3 - 3px);
    position: relative;
    &--image {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &--link {
      position: absolute;
      top: 0;
      left: 0;
      padding: 24px;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      span {
        color: #fff;
        font-size: 20px;
        line-height: 20px;
        font-weight: 500;
      }
      .icon {
        border: 1px solid #fff;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        img {
          width: 12px;
          transition: all 0.3s ease;
        }
      }
    }
    &:hover {
      .icon {
        background: #fff;
        img {
          filter: brightness(0);
          -webkit-filter: brightness(0);
        }
      }
    }
  }
}

@media only screen and (max-width: 1025px) {
  .categories {
    display: grid;
    flex-wrap: wrap;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    row-gap: 3px;

    &__item {
      height: 190px;
      &:last-child {
        grid-row: 2;
        grid-column: 1 / span 2;
      }
      &--link {
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
}
</style>