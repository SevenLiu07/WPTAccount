<template>
  <transition name="fade" v-if="popShow" >

    <div class="top_notification" >{{popText}}</div>

  </transition>

</template>

<script>
  export default {
    name: 'tips',
    data: function () {
      return {
        popShow: false,
        popText: ''
      }
    },

    methods: {
      popTips: function (tips) {
        let components = this
        this.popShow = true
        this.popText = tips
        setTimeout(function () {
          components.popShow = false
        }, 3000)
      }
    }
  }

</script>


<style scoped>

  .top_notification {
    position: absolute;
    text-align: center;
    top: -25px;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    display: inline-block;
    padding: 5px 8px;
    font-size: 12px;
    background-color: #ca4444;
    color: #fff;
    border-radius: 3px;
    min-width: 200px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>


