<template>
  <q-page padding class="">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->

    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
           <h4 class="text-blue-5">Learn Mathermatics</h4>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p>image</p>
        </div>
      </div>

       <div class="row q-pb-lg">
        <div class="col-12 text-center">
           <h4 class="">What is your name?</h4>
           <q-input outlined v-model="text" label="Your Name" />
        </div>
      </div>



    </div>

    <div class="flex flex-center">

     
    <q-btn
      class="bg-accent text-white"
      size="lg"
      @click="navigateToSelection"
    >Start</q-btn>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  data(){
    return{
      text:'',
    }
  },

  methods: {
    navigateToSelection(){
      this.$router.push('selection');
    }
  }
}
</script>
