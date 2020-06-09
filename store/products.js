export const state = () => ({
  products: null
});

export const getters = {
  getAllProducts(state) {
    return state.products;
  }
};

export const mutations = {
  SET_PRODUCTS(store, data) {
    store.products = data;
  }
};

export const actions = {
  async getProducts({ commit }) {
    try {
      const response = await this.$axios.get(`/Merians`);
      commit("SET_PRODUCTS", response.data);
    } catch (error) {
      throw Error(error);
    }
  },

  async addProducts(_ctx, obj) {
    try {
      const response = await this.$axios.post(`/Merians`, obj);
      return response;
    } catch (error) {
      throw Error(error);
    }
  },

  async editProduct(_ctx, obj) {
    try {
      delete obj._showDetails;
      const response = await this.$axios.put(`/Merians/${obj.id}`, obj);
      return response;
    } catch (error) {
      throw Error(error);
    }
  },

  async deleteProduct(_ctx, id) {
    try {
      const response = await this.$axios.delete(`/Merians/${id}`);
    } catch (error) {
      throw Error(error);
    }
  },

  async findProduct(_ctx, id) {
    try {
      const response = await this.$axios.get(`/Merians/Abc/${id}`);
      return response;
    } catch (error) {
      throw Error(error);
    }
  },

  
  
};
