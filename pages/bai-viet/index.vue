<template>
<div class="page-header">
    <h3 class="page-title"> Quản lí bài  viết </h3>
</div>
<div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">Tất cả bài viết</h4>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <div class="form-check form-check-muted m-0">
                                    <label class="form-check-label">
                                        <input type="checkbox" class="form-check-input">
                                    </label>
                                </div>
                            </th>
                            <th>Id</th>
                            <th>Text</th>
                            <th>Tổng Tương Tác</th>
                            <th>Ngày tạo</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="post in list" v-bind:key="post.id">
                            <th>
                                <div class="form-check form-check-muted m-0">
                                    <label class="form-check-label">
                                        <input type="checkbox" class="form-check-input">
                                    </label>
                                </div>
                            </th>
                            <nuxt-link :to="`/bai-viet/chi-tiet/${post._id}`"> <td>{{post._id}}</td> </nuxt-link>
                            <td>{{post.text}}</td>
                            <td>{{post.reactions.totalCount}}</td>
                            <td>{{formatDate(post.createdAt)}}</td>
                            <td v-if="post.is_active"><label class="badge badge-success">Active</label></td>
                            <td v-else><label class="badge badge-danger">Block</label></td>
                            <td v-if="!post.is_active"><label class="badge badge-success btn-action" @click="actionPost(post)">Active</label></td>
                            <td v-else><label class="badge badge-danger btn-action" @click="actionPost(post)">Block</label></td>
                            <td><label class="badge badge-danger btn-action" @click="deletePost(post)">
                                <span class="menu-icon"><i class="mdi mdi-delete"></i></span>Delete</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
        list: []
    }
  },

  async created() {
    await this.postsStore.getModals().then(() => {
      this.list = this.postsStore.getStateModals;
      this.isLoaded = true;
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
.btn-action {
    cursor: pointer;
}

.btn-action:hover {
    opacity: 0.5;
}
</style>