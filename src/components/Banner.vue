<template>
  <div :class="[bannerPic ? 'bg_image_web' : 'bg_image']">
    <img src="../assets/images/logo.png"/>
  </div>
</template>
<script>
  export default {
    name: 'bannerBg',
    data () {
      return {
        bannerPic: window.top === window.self
      }
    }

  }
</script>

<style scoped>
  @import '../assets/css/main.css';
  @import '../assets/css/username.css';
</style>
