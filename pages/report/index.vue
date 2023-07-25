<template>
<div class="page-header">
    <h3 class="page-title"> Quản lí báo cáo </h3>
</div>
<div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">Tất cả báo cáo</h4>
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
                            <th>ID</th>
                            <th>Tổng Bị Report</th>
                            <th>Post ID</th>
                            <th>Text</th>
                            <th>Tổng Tương Tác</th>
                            <th>Ngày tạo</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                            <!-- <th></th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in list" v-bind:key="item.id">
                            <template v-if="item.post">
                                <th>
                                    <div class="form-check form-check-muted m-0">
                                        <label class="form-check-label">
                                            <input type="checkbox" class="form-check-input">
                                        </label>
                                    </div>
                                </th>
                                <td>{{item._id}}</td>
                                <td>{{item.count_report}}</td>
                                <nuxt-link :to="`/bai-viet/chi-tiet/${item.post._id}`"> <td>{{item.post._id}}</td> </nuxt-link>
                                <td>{{item.post.text}}</td>
                                <td>{{item.post.reactions.totalCount}}</td>
                                <td>{{formatDate(item.post.createdAt)}}</td>
                                <td v-if="item.post.is_active"><label class="badge badge-success">Active</label></td>
                                <td v-else><label class="badge badge-danger">Block</label></td>
                                <td v-if="!item.post.is_active"><label class="badge badge-success btn-action" @click="actionPost(item.post)">Active</label></td>
                                <td v-else><label class="badge badge-danger btn-action" @click="actionPost(item.post)">Block</label></td>
                                <!-- <td><label class="badge badge-danger btn-action" @click="deletePost(item.post)">
                                    <span class="menu-icon"><i class="mdi mdi-delete"></i></span>Delete</label>
                                </td> -->
                            </template>
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
import { useReportStore } from "~/stores/report";
import { usePostsStore } from "~/stores/post";

export default {
  setup() {
    const isLoaded = ref(false);
    const runtimeConfig = useRuntimeConfig();
    const reportStore = useReportStore();
    const postsStore = usePostsStore();
    const route = useRoute();
    const helper = useHelper();

    async function actionPost(post) {
        console.log(post);
        const body = {
            is_active: !post.is_active,
        }
        await this.reportStore.actionPost(post._id, body);
    }

    async function deletePost(post) {
        await this.postsStore.deletePost(post._id);
    }

    return {
      route,
      reportStore,
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
    await this.reportStore.getModals().then(() => {
      this.list = this.reportStore.getStateModals;
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