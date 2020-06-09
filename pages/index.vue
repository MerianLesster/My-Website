<template>
  <div class="container">
    <div>
      <b-row>
        <b-col cols="1">
          <b-img
            height="70px"
            width="70px"
            :src="require('assets/logo.png')"
            fluid
            alt="Merian's Logo"
          ></b-img>
        </b-col>
        <b-col>
          <h1 class="title">
            Merian
          </h1>
        </b-col>
      </b-row>
      <div style="text-align: left;">
        <b-row>
          <b-col cols="2">
            <b-img
              rounded="circle"
              :src="require('assets/merian.png')"
              fluid
              alt="Merian's Logo"
            ></b-img>
          </b-col>
          <b-col>
            <h2 class="subtitle">
              About Me
            </h2>
            <h3>
              Passionate computer science undergraduate who would love to work
              for an encouraging and a stable company that will assist me in
              developing, improving and obtaining the necessary skills in the
              field of game development in order to become a professional game
              developer.
            </h3>
          </b-col>
        </b-row>
      </div>
      <div class="mt-5">
        <b-card no-body>
          <b-tabs pills card end v-model="tabIndex">
            <b-tab title="All" active @click="getProducts"
              ><b-card-text>Product Details</b-card-text>
            </b-tab>
            <b-tab title="Add"
              ><b-card-text>Add Product Details</b-card-text></b-tab
            >
            <b-tab title="Find"
              ><b-card-text>Find a Product</b-card-text></b-tab
            >
          </b-tabs>
          <displayProducts
            v-if="tabIndex === 0 && allProducts"
            :products="allProducts"
          />
          <addEditProduct v-if="tabIndex === 1" />
          <div v-if="tabIndex === 2">
            <b-input-group label="Enter Product Id:">
              <b-form-input
                v-model="id"
                type="text"
                required
                placeholder="Enter Product Id"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" @click="findProduct">Find</b-button>
              </b-input-group-append>
            </b-input-group>
              {{currentProduct && currentProduct.data}}
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import addEditProduct from "~/components/addEditProduct.vue";
import displayProducts from "~/components/displayProducts.vue";
export default {
  data() {
    return {
      tabIndex: 0,
      currentProduct: null,
      id: null
    };
  },
  components: {
    addEditProduct,
    displayProducts
  },
  computed: {
    ...mapGetters({
      allProducts: "products/getAllProducts"
    })
  },
  async mounted() {
    this.$nuxt.$on("reloadProducts", async () => {
      await this.getProducts();
    });
    await this.getProducts();
  },
  methods: {
    async getProducts() {
      await this.$store.dispatch("products/getProducts");
    },
    async findProduct() {
      const res = await this.$store.dispatch("products/findProduct", this.id);
      this.currentProduct = res;
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  margin-top: 20px;
  min-height: 100vh;
  display: flex;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
