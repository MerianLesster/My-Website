<template>
  <div>
    <b-table striped hover :fields="fields" :items="productList">
      <template v-slot:cell(action)="row">
        <b-button size="sm" variant="primary" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Close Edit" : "Edit" }}
        </b-button>
        <b-button size="sm" variant="danger" @click="deleteItem(row.item.id)" class="mr-2">
          Delete
        </b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <addEditProduct :productItem="row.item" />
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import addEditProduct from "~/components/addEditProduct.vue";

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: {
    addEditProduct
  },
  data() {
    return {
      fields: ['productName', 'productType', 'price', 'address', 'action'],
      productList: null
    };
  },

  mounted() {
    this.productList = JSON.parse(JSON.stringify(this.products));
  },
  methods:{
      async deleteItem(id){
        await this.$store.dispatch("products/deleteProduct", id);
        this.$emit("reloadProducts");
        window.alert("Successfully Deleted");
      }
  }
};
</script>

<style></style>
