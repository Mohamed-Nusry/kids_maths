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
           <q-input outlined v-model="username" label="Your Name" />
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
      username:'',
    }
  },

  methods: {
    navigateToSelection(){

      // let userData = {
      //   'username' : '',
      //   'level' : '',
      //   'xp' : '',
      //   'toffee' : '',
      //   'mode' : '',
        
      // };

      var userData = { 
          userinfo: { username: this.username, toffee: 10}, 
          addition: { level: 1, xp: 0, toffee: 5, mode: 'Beginner', recentxp: 0 }, 
          subtraction: { level: 1, xp: 0, toffee: 5, mode: 'Beginner', recentxp: 0 } ,
          division: { level: 1, xp: 0, toffee: 5, mode: 'Beginner', recentxp: 0 } ,
          multiplication: { level: 1, xp: 0, toffee: 5, mode: 'Beginner', recentxp: 0 } 
      }

      localStorage.setItem('userData',JSON.stringify(userData));

      console.log(JSON.parse(localStorage.getItem("userData")));

      // var modifyUserData = JSON.parse(localStorage.getItem("userData"));

      // existingEntries.push({userinfo : 'asasa'});

      // modifyUserData.userinfo.username = 'john';
      // localStorage.setItem("userData", JSON.stringify(modifyUserData));

      // console.log(JSON.parse(localStorage.getItem("userData")));


      this.$router.push('selection');
    }
  }
}
</script>
