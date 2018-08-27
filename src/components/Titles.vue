<template>
  <div class="web_top_title" v-if='topTitles'>
    <div class="top_title_main" v-text="titles"></div>
    <div class="top_title_sub" v-text="titlesCon"></div>
  </div>
</template>
<script>
  export default {
    name: 'topTitles',
    props: ['currentPage'],
    data () {
      return {
        topTitles: true,
        titles: '',
        titlesCon: ''
      }
    },
    mounted () {
      if (this.$store.state.platform === 'LegendHill' || this.$store.state.platform === 'Facebook') {
        this.titles = 'PLAY FREE POKER'
        this.titlesCon = 'While listening to your favorite music'
      } else {
        if (this.currentPage === 'loginText') {
          this.titles = 'WELCOME BACK'
          this.titlesCon = 'Login with Your PlayWPT Account'
        } else {
          this.titles = 'PLAY FREE POKER'
          this.titlesCon = 'With PlayWPT by World Poker Tour®'
        }
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/main.css';

</style>
