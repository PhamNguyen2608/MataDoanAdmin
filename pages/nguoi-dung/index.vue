<template>
<div class="page-header">
    <h3 class="page-title"> Quản lí người dùng </h3>
</div>
<div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">Tất cả người dùng</h4>
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
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Ngày tạo tài khoản</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in listUser" v-bind:key="user.id">
                            <th>
                                <div class="form-check form-check-muted m-0">
                                    <label class="form-check-label">
                                        <input type="checkbox" class="form-check-input">
                                    </label>
                                </div>
                            </th>
                            <td>{{user._id}}</td>
                            <td>{{user.first_name + ' ' + user.last_name}}</td>
                            <th>{{user.email}}</th>
                            <td>{{formatDate(user.createdAt)}}</td>
                            <td v-if="user.is_active"><label class="badge badge-success">Active</label></td>
                            <td v-else><label class="badge badge-danger">Block</label></td>
                            <td v-if="!user.is_active"><label class="badge badge-success btn-action" @click="actionUser(user)">Active</label></td>
                            <td v-else><label class="badge badge-danger btn-action" @click="actionUser(user)">Block</label></td>
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
import { useUsersStore } from "~/stores/user";
export default {
  setup() {
    const isLoaded = ref(false);
    const runtimeConfig = useRuntimeConfig();
    const usersStore = useUsersStore();
    const route = useRoute();
    const helper = useHelper();

    async function actionUser(user) {
        const body = {
            is_active: !user.is_active,
        }
        await this.usersStore.actionUser(user._id, body);
    }

    return {
      route,
      usersStore,
      runtimeConfig,
      helper,
      isLoaded,
      actionUser
    };
  },

  data() {
    return {
        listUser: []
    }
  },

  async created() {
    await this.usersStore.getModals().then(() => {
      this.listUser = this.usersStore.getStateModals;
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