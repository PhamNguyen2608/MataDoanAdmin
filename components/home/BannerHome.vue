<template>
  <section class="banner">
    <div class="banner__image">
      <img src="~/assets/img/banner-home.jpg" alt="" />
    </div>
    <div class="banner__content">
      <div class="banner__content__container">
        <div class="content__inner">
          <div class="content--pretitle">MEN'S BEST-SELLERS</div>
          <div class="content--title">RESTOCKED</div>
          <div class="content--desc">
            Những BST Đồng hồ nam được săn đón nhất đã quay trở lại
          </div>
          <div class="content--button btn-normal">Shop Now</div>
        </div>
      </div>
    </div>
  </section>
  <HomePoliciesHome />
</template>

<script>
export default {};
</script>

<style lang="scss">
.banner {
  position: relative;
  height: 520px;
  &__image {
    height: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &__container {
      max-width: 1170px;
      margin: 0 auto;
      height: 100%;
      .content__inner {
        width: 50%;
        height: 100%;
        // text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        .content--pretitle {
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 16px;
        }
        .content--title {
          font-size: 40px;
          line-height: 40px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .content--desc {
          font-family: SVN-Gotham;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.02em;
          max-width: 370px;
          margin-bottom: 40px;
        }
        .content--button {
          color: $bgColor;
          border: 1px solid $bgColor;
          min-width: 200px;
          padding: 18px 24px;
          &:hover {
            color: $textColorDark;
            background: $bgColor;
          }
        }
      }
    }
  }
}
</style>