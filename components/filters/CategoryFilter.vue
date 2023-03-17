<template>
  <div class="category-filter container">
    <div class="category-title d-flex a-center j-between">
      <ul class="category-title__left d-flex">
        <li
          class="d-flex a-center j-between"
          :class="{ active: activeAlbum }"
          @click="activeAlbum = !activeAlbum"
        >
          <span>BỘ SƯU TẬP</span>
          <i class="fa-solid fa-angle-down"></i>
        </li>
      </ul>
    </div>
    <div class="filler__modal" :class="{ show: activeAlbum }">
      <ul class="d-flex a-center">
        <li
          v-for="item in filterAlbums"
          :key="item"
          :class="{ active: item.active }"
          @click="
            setQuery(item.key);
            toggleActiveSelected(item);
          "
        >
          <div class="thumb">
            <img :src="item.img" alt="" />
          </div>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    return {
      route,
      router,
    };
  },
  data() {
    return {
      activeAlbum: true,
      activeAlbumArr: [],
      filterAlbums: [
        {
          id: 1,
          name: "COLOSSEUM",
          key: "colosseum",
          img: "/_nuxt/assets/img/Colosseum.png",
          active: false,
        },
        {
          id: 2,
          name: "KASHMIR",
          key: "kashmir",
          img: "/_nuxt/assets/img/Kashmir.png",
          active: false,
        },
        {
          id: 3,
          name: "WEIMAR",
          key: "weimar",
          img: "/_nuxt/assets/img/Weimar.png",
          active: false,
        },
        {
          id: 4,
          name: "DETROIT",
          key: "detroit",
          img: "/_nuxt/assets/img/Detroit_1.png",
          active: false,
        },
        {
          id: 5,
          name: "FUTURA",
          key: "futura",
          img: "/_nuxt/assets/img/Futura.png",
          active: false,
        },
      ],
    };
  },
  methods: {
    toggleActiveSelected(element) {
      const selectedElementIndex = this.filterAlbums.findIndex(
        (item) => item.key === element.key
      );
      this.filterAlbums[selectedElementIndex].active =
        !this.filterAlbums[selectedElementIndex].active;
    },

    setQuery(queryName) {
      const params = Object.assign({}, this.route.query);

      if (params[queryName]) {
        delete params[queryName];
      } else {
        params[queryName] = 1;
      }

      this.router.push({ query: { ...params } });
    },
  },
};
</script>

<style lang="scss">
.category-filter {
  position: relative;

  .category-title {
    margin-top: 30px;
    ul {
      li {
        cursor: pointer;
        color: $textColorDark;
        line-height: 14px;
        letter-spacing: 0.02em;
        font-size: 14px;
        padding: 20px;
        span {
          margin-right: 8px;
        }
      }
    }
    &__left {
      li {
        background-color: #ecebea;
        border-right: 1.5px solid #f8f7f4;
      }
    }
  }
  .filler__modal {
    position: absolute;
    background: #ecebea;
    padding: 40px;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    transition: all 0.3s ease;
    z-index: 2;
    &.show {
      border-top: 1px solid #999;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    ul {
      li {
        cursor: pointer;
        margin-right: 30px;
        text-align: center;
        transition: all 0.3s ease;
        &:hover {
          transform: translateY(-3px);
          span {
            color: rgba(22, 26, 33, 0.667);
          }
        }
        &.active {
          .thumb {
            border: 2px solid #333;
          }
          span {
            font-weight: 700;
          }
        }
        .thumb {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #f8f7f4;
          margin-bottom: 20px;
        }
        span {
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }
}
</style>