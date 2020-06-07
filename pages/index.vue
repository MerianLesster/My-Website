<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        Merian
      </h1>
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
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  margin-top: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
