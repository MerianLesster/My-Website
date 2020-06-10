<template>
  <div class="container">
    <div>
      <b-row>
        <b-col cols="1" class="mt-2">
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
            Product Stock Controlling System
          </h1>
        </b-col>
      </b-row>
      <div>
        <b-row>
          <b-col cols="2" class="mt-5">
            <b-img
              rounded="circle"
              :src="require('assets/merian.png')"
              fluid
              alt="Merian's Logo"
            ></b-img>
          </b-col>
          <b-col>
            <h2 class="subtitle">
              About Me (Developer)
            </h2>
            <h3>
              Passionate computer science undergraduate who would love to work
              for an encouraging and a stable company that will assist me in
              developing, improving and obtaining the necessary skills in the
              field of Software Development in order to become a professional
              developer.
            </h3>
          </b-col>
        </b-row>
      </div>
      <div class="mt-5">
        <b-card no-body>
          <b-tabs pills card end v-model="tabIndex">
            <b-tab title="All" active @click="getProducts"
              ><b-card-text><h4 class="tabletitle">Product Details</h4></b-card-text>
            </b-tab>
            <b-tab title="Add"
              ><b-card-text><h4 class="tabletitle">Add Product Details</h4></b-card-text></b-tab
            >
            <b-tab title="Find"
              ><b-card-text><h4 class="tabletitle">Find a Product</h4></b-card-text></b-tab
            >
          </b-tabs>
          <displayProducts
            :key="keyIndex"
            v-if="tabIndex === 0 && allProducts"
            :products="allProducts"
          />
          <addEditProduct :key="tabIndex" v-if="tabIndex === 1" />
          <div :key="tabIndex" v-if="tabIndex === 2">
            <b-input-group label="Enter Product Id:">
              <b-form-input
                v-model="id"
                type="text"
                required
                placeholder="Enter Product Id to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" @click="findProduct">Find</b-button>
                <b-button variant="danger" @click="resetFindProduct">Reset</b-button>
              </b-input-group-append>
            </b-input-group>
            <div v-if="(currentProduct && !resetFind)">
              <b-card>
                <p>* Product Name: {{ currentProduct.productName }}</p>
                <p>* Product Type: {{ currentProduct.productType }}</p>
                <p>* Product Price: {{ currentProduct.price }}</p>
                <p>* Product Address: {{ currentProduct.address }}</p>
              </b-card>
            </div>
            <div v-else>
              <b-card style="textAlign:center">
                No Product Found
              </b-card>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import addEditProduct from "~/components/addEditProduct.vue";
import displayProducts from "~/components/displayProducts.vue";
export default {
  data() {
    return {
      tabIndex: 0,
      currentProduct: null,
      id: null,
      keyIndex: 0,
      resetFind: false
    };
  },
  components: {
    addEditProduct,
    displayProducts
  },
  computed: {
    ...mapState({
      allProducts: state => state.products.products
    })
  },
  async mounted() {
    this.$nuxt.$on("reloadProducts", async () => {
      console.log("nuxtOn");
      await this.getProducts();
      this.keyIndex += 1;
    });
    await this.getProducts();
  },
  methods: {
    async getProducts() {
      await this.$store.dispatch("products/getProducts");
    },
    async findProduct() {
      const res = await this.$store.dispatch("products/findProduct", this.id);
      if(res.status === 200){
        this.currentProduct = res.data;
      } else {
        this.currentProduct = null;
      }
      this.resetFind = false;
    },
    resetFindProduct(){
      this.resetFind = true;
      this.id = null;
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
  font-size: 60px;
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

.tabletitle {
  font-weight: 300;
  font-size: 28px;
  color: #526488;
  word-spacing: 5px;
  text-align: center;
}

.links {
  padding-top: 15px;
}
</style>
