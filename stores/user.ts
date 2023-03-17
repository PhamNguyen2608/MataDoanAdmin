import { defineStore } from 'pinia'

export const useUsersStore = defineStore({
  id: 'users-store',
  state: () => {
    return {
      list: [],
    }
  },
  actions: {
    async getModals(params: object) {
      await useBaseFetch('/api/v1/admins/users', {method: 'GET', params})
      .then((res: any) => {
        this.list = res.data.users;
      });
    },
    async actionUser(userId: string, data: object) {
      await useBaseFetch(`/api/v1/admins/users/${userId}`, {method: 'POST', data})
      .then((res: any) => {
        const userId = res.data.user._id;
        const index = this.list.findIndex(user => user._id === userId);
        this.list[index].is_active = res.data.user.is_active
      });
    },
  },
  getters: {
    getStateModals() : Array<Object> {
      return this.list
    },
  },
})