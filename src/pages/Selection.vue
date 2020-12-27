<template>
  <q-page padding class="">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->

    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
           <h4 class="text-blue-5">Hello {Name}</h4>

           <h5 class="">Select from below to get started</h5>
        </div>
      </div>

      <div class="row text-center ">
        <div class="col-6 q-pr-md">
          <div style="background: #EBD97E; height: 150px;" @click="navigateToGameplay(1)">
            <p class="text-weight-bold" style="padding:50px; font-size:30px;">+</p>
          </div>
          
        </div>
        <div class="col-6">
          <div style="background: #EBD97E; height: 150px;" @click="navigateToGameplay(2)">
              <p class="text-weight-bold" style="padding:50px; font-size:30px;">-</p>
          </div>
        </div>
        
      </div>

      <div class="row text-center q-pt-md">
        <div class="col-6 q-pr-md">
          <div style="background: #EBD97E; height: 150px;" @click="navigateToGameplay(3)">
            <p class="text-weight-bold" style="padding:50px; font-size:30px;">X</p>
          </div>
        </div>
        <div class="col-6">
          <div style="background: #EBD97E; height: 150px;" @click="navigateToGameplay(4)">
            <p class="text-weight-bold" style="padding:50px; font-size:30px;">/</p>
          </div>
        </div>
      </div>
<!-- 
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
      </div> -->



    </div>

    <!-- <div class="flex flex-center">

     
    <q-btn
      class="bg-accent text-white"
      size="lg"
    >Start</q-btn>

    </div> -->
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  data(){
    return{
      // text:'',
    }
  },

  methods: {
    navigateToGameplay(){
      this.$router.push('gameplay');
    }
  }

  
}
</script>
