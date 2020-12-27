<template>
  <q-page padding class="">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->
    
    <div class="container">

      <div class="row text-center">
        <div class="col-4">
          <p>Level - 0</p>
        </div>
         <div class="col-4">
          <p>Mode - Easy</p>
        </div>
         <div class="col-4">
          <p>Toffee count</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center">
           <h4 class="text-blue-5">{Mode}</h4>

           <!-- <h5 class="">Select from below to get started</h5> -->
        </div>
      </div>

      <div class="row text-center ">
        <div class="col-12">

          <h5>13 + 2</h5>
          <!-- dir="rtl" -->

            <!-- <q-input id="answerBox" style=" unicode-bidi: bidi-override !important; direction:RTL !important;" @input="flipText" outlined v-model="answer" label="Answer" /> -->

            <input class="answerType" autofocus type="text" v-model="answer" placeholder="Answer"  name="textbox" style="" />
         
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
      answer:'',
    }
  },

  methods: {
    flipText(e){
     
        // var text = this.answer;
        // var org  = String(text).trim().split('').reverse().join('');      
        // this.answer = org;      
        //  if( this.answer.setSelectionRange){
        //      this.answer.setSelectionRange(0,0);
        // }
      
    }
  }

}
</script>


<style scoped>
  #answerBox {
   
  }

  .answerType{
    border-radius: 7px;
    width: 100%;
    height: 50px;
    /* border-color: #dcdcdc8c; */
    font-size: 22px;
    border: 1px solid #b3a3a3;
    direction:RTL;
    unicode-bidi:bidi-override; 
    padding: 10px;

  }

  .answerType:focus {
     outline: none !important;
    border-color: #719ECE;
    box-shadow: 0 0 10px #920692;
  }
</style>
