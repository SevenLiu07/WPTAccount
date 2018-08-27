<template>
  <div class="captcha">

    <input @blur="codeBlur($event)"/>
    <ul>
      <li><img :src="captchaSrc"/></li>
    </ul>
    <span @click="refresh">Refresh</span>

  </div>
</template>
<script>
  import api from '../api/account.js'

  export default {

    props: ['captChaCode', 'captChaToken'],
    data () {
      return {
        captchaSrc: '',
        result: ''
      }
    },
    methods: {

      refresh () {
        let data = {
          version: Math.random()
        }
        api.getCaptchaToken(data)
            .then( res =>{ if (res.Value) {
        let result = res.Value
        if (result) {
              this.captchaSrc = 'WebAPI/page/Captcha/GenerateCaptchaImg?time=' + + '&token=' + result
              this.$parent.captChaToken = result
            }
          }
        })
      },
      codeBlur (e) {
        this.$parent.captChaCode = e.target.value
      }
    }
  }
</script>
<style>
  .captcha {
    width: 13.5rem;
    margin: 0.3rem auto 0 auto;
    overflow: hidden;
    height: 1.45rem;
  }

  .captcha input {
    border: 1px solid #4a70df;
    border-radius: 0.2rem;
    width: 4.5rem;
    line-height: 1.25rem;
    float: left;
    text-indent: 0.5rem;
    font-size: 0.7rem;
  }

  .captcha ul {
    float: left;
  }

  .captcha ul img {
    width: 4.5rem;
    height: 1.25rem;
    border-radius: 0.2rem;
    margin-left: 0.8rem;
    overflow: hidden;
    border: 1px solid #4a70df;
  }

  .captcha span {
    float: right;
    text-align: center;
    line-height: 1.3rem;
    color: #1acef8;
    font-size: 0.7rem;
    cursor: pointer;
  }
</style>
