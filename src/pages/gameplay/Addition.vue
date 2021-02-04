<template>
  <q-page padding class="">

    <div :class="(isAnswerCorrect) ? 'pyro' : ''">
       <div v-if="isAnswerCorrect" class="before"></div>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->
    
    <div class="container">



      <div class="row text-center">
        <div class="col-3">
          <p>Level - {{level}}</p>
        </div>
         <div class="col-3">
          <p>Mode - {{gameMode}}</p>
        </div>
         <div class="col-3">
          <p>Toffees - {{toffeeCount}}</p>
        </div>
         <div class="col-3">
          <p>XP - {{xpPoints}}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
            <q-linear-progress stripe rounded size="20px" :value="timerProgress" color="warning" class="q-mt-sm" />

        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center">
           <h4 class="text-blue-5">{{playMode}}</h4>

           <!-- <h5 class="">Select from below to get started</h5> -->
        </div>
      </div>

      <div class="row text-center ">
        <div class="col-12">

          <!-- <h5>13 + 2</h5> -->

           <q-input class="questionBox" id="firstNumber" style="direction:RTL !important;" readonly v-model="firstNumber" label="" />
           <q-input class="questionBox" id="secondNumber" style="direction:RTL !important;" readonly v-model="secondNumber" label="" />


          <!-- dir="rtl" -->

            <!-- <q-input id="answerBox" style=" unicode-bidi: bidi-override !important; direction:RTL !important;" @input="flipText" outlined v-model="answer" label="Answer" /> -->
          <br>
            <input :disabled="pendingStart" @keyup.enter="submitAnswer" class="answerType" autofocus type="text" v-model="answer" placeholder="Answer"  name="textbox" style="" />
            

           <h5 v-if="tryAgainBanner"><span> <q-icon name="close" size="lg" color="red" /> </span> Try Again</h5>
           <h5 v-if="showCorrectAnswer"><span> <q-icon name="close" size="lg" color="red" /> </span> The Answer = {{this.correctAnswer}}</h5>
           <h5 v-if="isAnswerCorrect"><span> <q-icon name="check" size="lg" color="green" /> </span> Correct Answer</h5>

             
            <q-btn
              v-if="showCorrectAnswer"
              icon="sentiment_very_dissatisfied"
              color="red"
              class="bg-accent text-white"
              size="lg"
              @click="startAgain()"
            >But I am Ready Now</q-btn>

            <q-btn
              v-if="isAnswerCorrect"
              icon="sentiment_very_satisfied"
              class="bg-accent text-white "
              size="lg"
              @click="startAgain()"
            >Yay! Give Me Next</q-btn>


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
    
   
      <div v-if="isAnswerCorrect" class="after"></div>
    </div>
  </q-page>
</template>

<script>

let modifyUserData = JSON.parse(localStorage.getItem("userData"));

export default {
  
  name: 'PageIndex',

  data(){
    return{
      answer:'',
      firstNumber:15,
      secondNumber:5,
      timerProgress: 1,
      sign:'+',
      signValue: 'addition',
      correctAnswer: 1,
      showCorrectAnswer: false,
      intervalTimer: '',
      isAnswerCorrect: false,
      tryAgainBanner: false,
      pendingStart: false,
      playMode: 'Addition',

      gameData: null,
      level: 0,
      gameMode: 'Easy',
      toffeeCount: 0,
      xpPoints: 0,

      // soundPlayable: true,
    }
  },

  watch: {
        // whenever loggeduser changes, this function will run
        // JSON.parse(localStorage.getItem("userData")) && JSON.parse(localStorage.getItem("userData")).this.signValue ?  JSON.parse(localStorage.getItem("userData")).this.signValue.level : 1212121
        gameData: function () {

           console.log(this.gameData);

        },
  },

  
  
  mounted(){
    this.loadDataToSystem();
  },

  created(){
    
     this.startProgressTimer(1000);
  },

  methods: {

    startProgressTimer(intervalTime){
       var interval = setInterval(() => {
         this.intervalTimer = interval;
        if (this.timerProgress <= 0) {
          this.timerProgress = 0
          console.log('timeup')
         
          clearInterval(interval);
          this.timeUp();
          return
        }
        // console.log(this.timerProgress)
        this.timerProgress = this.timerProgress - 0.1;
      },  intervalTime)
    
    },

    loadDataToSystem(){

      if(JSON.parse(localStorage.getItem("userData")) && JSON.parse(localStorage.getItem("userData")) != null){
      // var signValuesss = 'addition';
      this.gameData = JSON.parse(localStorage.getItem("userData"));

      this.toffeeCount = JSON.parse(localStorage.getItem("userData")).userinfo.toffee;
     

      switch (this.signValue) {
        case 'addition':
             this.playMode = 'Addition (+)';
             this.level = JSON.parse(localStorage.getItem("userData")).addition.level;
             this.gameMode = JSON.parse(localStorage.getItem("userData")).addition.mode;
            //  this.toffeeCount = JSON.parse(localStorage.getItem("userData")).addition.toffee;
             this.xpPoints = JSON.parse(localStorage.getItem("userData")).addition.xp;
          break;
      
        default:
          break;
      }

    }else{
      this.gameData = null;
    } 

    },

    playSound(sound,status){

      console.log(status);

      let audioName = sound;

      var audio = new Audio(require('../../assets/sounds/'+audioName+'.mp3'))

      
     

      if(status == true){

        

        audio.play();

        setTimeout(() => {

          audio.pause();
          audio.currentTime = 0;
          // console.log('stopped');

        },  10000)

      }else{

        audio.pause();
        audio.currentTime = 0;
        
      }


    },

    addToffeCount(){
      
      //max - min + 1 + min
      var countToffee = Math.floor(Math.random() * (10-1+1)) + 1;
      modifyUserData.userinfo.toffee = modifyUserData.userinfo.toffee + countToffee;
      localStorage.setItem("userData", JSON.stringify(modifyUserData));
      
    },

    submitAnswer(){

      var num = this.answer;

      // const reversedNum = num => parseFloat(num.toString().split('').reverse().join('')) * Math.sign(num)
      var originalAnswer = num.toString().split('').reverse().join('');

      switch (this.sign) {
        case '+':

          var expectedAnswer = this.firstNumber + this.secondNumber;

          if(originalAnswer == expectedAnswer){

            this.addToffeCount();

            this.addMarks();

          
            this.playSound('victory1',true);

            // Math.floor((Math.random() * 100) + 1);
            this.tryAgainBanner = false;
            this.isAnswerCorrect = true;
            this.pendingStart = true;
            clearInterval(this.intervalTimer);
            // this.generateNumbers();
            // this.firstNumber = Math.floor((Math.random() * 10) + 10);
            // this.secondNumber = Math.floor((Math.random() * 10) + 10);
            // this.clear();
            // this.timerProgress = 1;
            // this.startProgressTimer(1000);
          }else{
            this.clear();
            
            this.tryAgainBanner = true;

            setTimeout(() => {

              this.tryAgainBanner = false;

            },  5000)
          }
          
          break;
        
        case '-':

          break;

        case '/':

          break;

        case '*':

          break;
      
        default:
          break;
      }
      
    },

    startAgain(){

        this.generateNumbers();
        this.firstNumber = Math.floor((Math.random() * 10) + 10);
        this.secondNumber = Math.floor((Math.random() * 10) + 10);
        this.clear();
        this.timerProgress = 1;
        this.startProgressTimer(1000);

        this.playSound('victory1',false);

    },

    timeUp(){
      this.correctAnswer = this.firstNumber + this.secondNumber;
      this.showCorrectAnswer = true;
      this.tryAgainBanner = false;
      this.pendingStart = true;
    },

    generateNumbers(){
      this.showCorrectAnswer = false;
      this.tryAgainBanner = false;
      this.isAnswerCorrect = false;
      this.pendingStart = false;
    },

    clear(){
      this.answer = '';
    },

    addMarks(){

     
      //Since XP points are different for each mode we have to add switch statement
      switch (this.signValue) {
        case 'addition':
         
            //Add xp points
            //max - min + 1 + min

            var randomXp = 0;
            //XP points change according to level and following conditions check those and add XP points and change level mode
            if(modifyUserData.addition.level > 0 && modifyUserData.addition.level < 10){
              randomXp = Math.floor(Math.random() * (30-20+1)) + 20;
              modifyUserData.addition.mode = 'Beginner';
            }else{

              if(modifyUserData.addition.level >= 10 && modifyUserData.addition.level < 25){
                randomXp = Math.floor(Math.random() * (25-10+1)) + 10;
                modifyUserData.addition.mode = 'Easy';

              }else{

                if(modifyUserData.addition.level >= 25 && modifyUserData.addition.level < 50){

                  randomXp = Math.floor(Math.random() * (15-8+1)) + 8;
                  modifyUserData.addition.mode = 'Medium';

                }else{

                  if(modifyUserData.addition.level >= 50 && modifyUserData.addition.level < 100){

                    randomXp = Math.floor(Math.random() * (10-5+1)) + 5;
                    modifyUserData.addition.mode = 'Pro';

                  }else{

                    randomXp = Math.floor(Math.random() * (5-2+1)) + 2;
                    modifyUserData.addition.mode = 'Champion';
                    

                  }
                  

                }


              }
            }

           

           
            // var randomXp = Math.floor((Math.random() * 30) + 30);
            modifyUserData.addition.xp =  modifyUserData.addition.xp + randomXp
            console.log(randomXp);

            this.increaseLevel();

            localStorage.setItem("userData", JSON.stringify(modifyUserData));

            console.log(JSON.parse(localStorage.getItem("userData")));

            this.loadDataToSystem();

              
          break;
      
        default:
          break;
      }

      console.log('testing...');

    },

    increaseLevel(){

      switch (this.signValue) {
        case 'addition':

           if (modifyUserData.addition.xp > modifyUserData.addition.recentxp) {
             var differnceXp = modifyUserData.addition.xp - modifyUserData.addition.recentxp;
             if(differnceXp >= 100){

               modifyUserData.addition.recentxp =  modifyUserData.addition.xp;
               modifyUserData.addition.level =  modifyUserData.addition.level + 1;

               localStorage.setItem("userData", JSON.stringify(modifyUserData));

               console.log('levelup');

             }

           }
           

        

              
        break;
      
      default:
        break;
      }



      


    },

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

  .questionBox{
    font-size: 22px;
    width: 100%;
    height: 50px;
    border: none !important;
    outline: none !important;
  }











  /* Gif */

  body {
  margin: 0;
  padding: 0;
  background: #000;
  overflow: hidden; }

.pyro > .before, .pyro > .after {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: -120px -218.66667px blue, 248px -16.66667px #00ff84, 190px 16.33333px #002bff, -113px -308.66667px #ff009d, -109px -287.66667px #ffb300, -50px -313.66667px #ff006e, 226px -31.66667px #ff4000, 180px -351.66667px #ff00d0, -12px -338.66667px #00f6ff, 220px -388.66667px #99ff00, -69px -27.66667px #ff0400, -111px -339.66667px #6200ff, 155px -237.66667px #00ddff, -152px -380.66667px #00ffd0, -50px -37.66667px #00ffdd, -95px -175.66667px #a6ff00, -88px 10.33333px #0d00ff, 112px -309.66667px #005eff, 69px -415.66667px #ff00a6, 168px -100.66667px #ff004c, -244px 24.33333px #ff6600, 97px -325.66667px #ff0066, -211px -182.66667px #00ffa2, 236px -126.66667px #b700ff, 140px -196.66667px #9000ff, 125px -175.66667px #00bbff, 118px -381.66667px #ff002f, 144px -111.66667px #ffae00, 36px -78.66667px #f600ff, -63px -196.66667px #c800ff, -218px -227.66667px #d4ff00, -134px -377.66667px #ea00ff, -36px -412.66667px #ff00d4, 209px -106.66667px #00fff2, 91px -278.66667px #000dff, -22px -191.66667px #9dff00, 139px -392.66667px #a6ff00, 56px -2.66667px #0099ff, -156px -276.66667px #ea00ff, -163px -233.66667px #00fffb, -238px -346.66667px #00ff73, 62px -363.66667px #0088ff, 244px -170.66667px #0062ff, 224px -142.66667px #b300ff, 141px -208.66667px #9000ff, 211px -285.66667px #ff6600, 181px -128.66667px #1e00ff, 90px -123.66667px #c800ff, 189px 70.33333px #00ffc8, -18px -383.66667px #00ff33, 100px -6.66667px #ff008c;
  -moz-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -webkit-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -o-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -ms-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards; }

.pyro > .after {
  -moz-animation-delay: 1.25s, 1.25s, 1.25s;
  -webkit-animation-delay: 1.25s, 1.25s, 1.25s;
  -o-animation-delay: 1.25s, 1.25s, 1.25s;
  -ms-animation-delay: 1.25s, 1.25s, 1.25s;
  animation-delay: 1.25s, 1.25s, 1.25s;
  -moz-animation-duration: 1.25s, 1.25s, 6.25s;
  -webkit-animation-duration: 1.25s, 1.25s, 6.25s;
  -o-animation-duration: 1.25s, 1.25s, 6.25s;
  -ms-animation-duration: 1.25s, 1.25s, 6.25s;
  animation-duration: 1.25s, 1.25s, 6.25s; }

@-webkit-keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white; } }
@-moz-keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white; } }
@-o-keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white; } }
@-ms-keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white; } }
@keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white; } }
@-webkit-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0; } }
@-moz-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0; } }
@-o-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0; } }
@-ms-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0; } }
@keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0; } }
@-webkit-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%; }

  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%; }

  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%; }

  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%; }

  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%; } }
@-moz-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%; }

  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%; }

  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%; }

  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%; }

  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%; } }
@-o-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%; }

  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%; }

  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%; }

  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%; }

  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%; } }
@-ms-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%; }

  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%; }

  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%; }

  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%; }

  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%; } }
@keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%; }

  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%; }

  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%; }

  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%; }

  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%; } }


  /* Gif End */
</style>
