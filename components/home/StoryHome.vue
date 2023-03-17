<template>
  <section class="story-home">
    <div class="story-home__content">
      <div class="story-home__content__top">
        <div class="story__logo">
          <img src="~/assets/img/logo_small.svg" alt="" />
        </div>
        <h3 class="title">THE STORY OF CURNON</h3>
        <p class="desc">
          Cuối năm 2016, 3 chàng trai đam mê Startup và Đồng hồ quyết định thành
          lập Curnon, nhưng ngay từ đầu, chúng tôi đã biết rằng: Curnon sinh ra
          với một sứ mệnh lớn lao hơn, không chỉ dừng lại là một thương hiệu
          đồng hồ. Chúng tôi muốn mang tới một nguồn cảm hứng, một sự thay đổi
          về tư duy, về suy nghĩ và chính những cái chúng tôi gọi là trải nghiệm
          cho người trẻ.
        </p>
      </div>
      <div class="story-home__content__bottom">
        <img src="~/assets/img/storyLarge.png" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.story-home {
  &__content {
    max-width: 1170px;
    margin: 0 auto;
    &__top {
      max-width: 700px;
      margin: 0 auto;
      .story__logo {
        text-align: center;
        img {
          width: 37px;
        }
      }
      .title {
        font-size: 20px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 0.02em;
        font-weight: 400;
        padding-bottom: 32px;
      }
      .desc {
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        letter-spacing: 0.02em;
        color: rgba(22, 26, 33, 0.6);
        padding-bottom: 90px;
      }
    }
  }
}
</style>