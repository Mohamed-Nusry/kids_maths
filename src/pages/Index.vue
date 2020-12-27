<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->

    
    <q-btn
      class="bg-accent text-white"
      size="lg"
      @click="navigateToName();"
    >Play</q-btn>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  methods: {
    navigateToName(){
      this.$router.push('start');
    }
  }
}
</script>
