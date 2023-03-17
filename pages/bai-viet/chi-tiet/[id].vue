<template>
  <div v-if="isLoaded">
    <div class="page-header">
      <h3 class="page-title"> Chi tiết bài viết </h3>
    </div>
    <div class="card">
      <div class="card-body">
        <form class="forms-sample">
          <div class="form-group">
            <label for="text">Text</label>
            <div> <textarea v-model="item.text" /> </div>
          </div>
          <div class="form-group">
            <div>Created At: {{ formatDate(item.createdAt) }} </div>
          </div>
          <div class="img-post form-group" v-for="img in item.images" v-bind:key="img">
            <img :src="img" class="img-post-detail">
          </div>
          <div class="form-group">
            <div>Total Reactions: {{ item.reactions.totalCount }} </div>
          </div>
          <div type="submit" class="badge badge-danger btn-action" @click="deletePost(post)">Delete</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostsStore } from "~/stores/post";
export default {
  setup() {
    const isLoaded = ref(false);
    const runtimeConfig = useRuntimeConfig();
    const postsStore = usePostsStore();
    const route = useRoute();
    const helper = useHelper();

    async function actionPost(post) {
        const body = {
            is_active: !post.is_active,
        }
        await this.postsStore.actionPost(post._id, body);
    }

    async function deletePost(post) {
        await this.postsStore.deletePost(post._id);
    }

    return {
      route,
      postsStore,
      runtimeConfig,
      helper,
      isLoaded,
      actionPost,
      deletePost,
    };
  },

  data() {
    return {
      item: null
    }
  },

  async created() {
    await this.postsStore.getModal(this.route.params.id).then(() => {
      this.item = this.postsStore.getStateModal;
      this.isLoaded = true
    });
  },

  methods: {
    formatDate(date) {
      return new Date(date).toISOString().slice(0, 10)
    },
  }
}
</script>

<style>
textarea {
  width: 100%;
}

.btn-action {
    cursor: pointer;
}

.btn-action:hover {
    opacity: 0.5;
}

.img-post {
  display: flex;
  justify-content: flex-start;
}

.img-post-detail {
  width: 150px;
}
</style>