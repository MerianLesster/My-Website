<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" style="margin:20px">
      <b-form-group label="Enter Product Name:">
        <b-form-input
          v-model="form.productName"
          type="text"
          required
          placeholder="Enter Product Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Enter Product Type:">
        <b-form-select
          v-model="form.productType"
          :options="types"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Enter Product Price:">
        <b-form-input
          v-model="form.price"
          type="number"
          required
          placeholder="Enter Product Price"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Enter Product Address:">
        <b-form-input
          v-model="form.address"
          type="text"
          required
          placeholder="Enter Product Address"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">{{
        productItem ? "Edit" : "Add"
      }}</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    productItem: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      show: true,
      form: {
        productName: "",
        productType: null,
        price: 0,
        address: ""
      },
      types: [
        { text: "Select One", value: null },
        "Food Items",
        "Ornaments",
        "Electronic Items",
        "Games"
      ]
    };
  },
  mounted() {
    if (this.productItem) {
      (this.form.productName = this.productItem.productName),
        (this.form.productType = this.productItem.productType),
        (this.form.price = this.productItem.price),
        (this.form.address = this.productItem.address);
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      this.form.price = parseFloat(this.form.price);
      if (this.productItem) {
          const finalObj = {...this.productItem,...this.form}
        await this.$store.dispatch("products/editProduct", finalObj);
        window.alert("Successfully Edited");
      } else {
        await this.$store.dispatch("products/addProducts", this.form);
        window.alert("Successfully Added");
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      (this.form.productName = ""),
        (this.form.productType = null),
        (this.form.price = 0),
        (this.form.address = "");
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style></style>
