<template>
  <div>
    <BCGovNavBar />
    <v-container>
      <h1 class="my-6 text-center">Welcome to Vuetify</h1>
      <HelloWorld />
    </v-container>
  </div>
</template>

<script>
import BCGovNavBar from '@/components/bcgov/BCGovNavBar.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    BCGovNavBar,
    HelloWorld
  }
};
</script>
