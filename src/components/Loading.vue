<template>
  <div class="loading">
      <img width="24" height="24" src="../assets/img/loading.gif">
      <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在加载中...'
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .loading {
    width: 100%;
    text-align: center;
    .desc {
        line-height: 20px;
        font-size: 1.4rem;
        color: #333;
    }
  }
</style>

