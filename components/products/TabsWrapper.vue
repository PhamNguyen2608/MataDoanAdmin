<template>
  <div class="tabs container">
    <ul class="tabs__header">
      <li
        v-for="title in tabTitiles"
        :key="title"
        :class="{ active: title == selectedTitle }"
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
export default {
  setup(props, { slots }) {
    const tabTitiles = ref(slots.default().map((tab) => tab.props.title));
    const selectedTitle = ref(tabTitiles.value[0]);

    provide("selectedTitle", selectedTitle);

    return {
      selectedTitle,
      tabTitiles,
    };
  },
};
</script>

<style lang="scss">
.tabs {
  padding: 80px 0px 16px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid rgb(214, 214, 212);
    margin-bottom: 20px;
    li {
      padding: 22px 32px;
      cursor: pointer;
      font-weight: 400;
      text-transform: uppercase;
      line-height: 16px;
      letter-spacing: 0.02em;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
      &:hover {
        border-bottom: 2px solid #000;
      }
      &.active {
        border-bottom: 2px solid #000;
      }
    }
  }
}
</style>