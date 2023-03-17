import { defineStore } from 'pinia'

export const useReportStore = defineStore({
  id: 'report-store',
  state: () => {
    return {
      list: [],
      item: {},
    }
  },
  actions: {
    async getModal(postId: string) {
      await useBaseFetch(`/api/v1/admins/report/${postId}`, {method: 'GET'})
      .then((res: any) => {
        this.item = res.data.post
      });
    },
    async getModals(params: object) {
      await useBaseFetch('/api/v1/admins/report', {method: 'GET', params})
      .then((res: any) => {
        this.list = res.data
      });
    },
    async actionPost(postId: string, data: object) {
      await useBaseFetch(`/api/v1/admins/posts/${postId}`, {method: 'POST', data})
      .then((res: any) => {
        const postId = res.data.post._id;
        const index = this.list.findIndex(post => post.post?._id === postId);
        this.list[index].post.is_active = res.data.post.is_active
      });
    },
    async deletePost(postId: string) {
      await useBaseFetch(`/api/v1/admins/report/${postId}`, {method: 'DELETE'})
      .then((res: any) => {
        const postId = res.data.post._id;
        const index = this.list.findIndex(post => post._id === postId);
        this.list.splice(index, 1)
      });
    },
  },
  getters: {
    getStateModals() : Array<Object> {
      return this.list
    },
    getStateModal() : Object {
      return this.item
    },
  },
})