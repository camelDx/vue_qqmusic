<!-- 无返回数据组件 -->
<template>
  <div class="no-sesult-wrapper">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'noresult',
  data () {
    return {}
  },
  props: {
    title: {
      type   : String,
      default: '抱歉，暂无数据'
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/common/less/const.less";
@import "~@/common/less/mymixin.less";

.no-sesult-wrapper {
  text-align: center;
  .no-result-icon {
    width : 86px;
    height: 90px;
    margin: 0 auto;
    .bg-image('no-result');
    background-size: 86px 90px;
  }
  .no-result-text {
    margin-top: 30px;
    font-size : @font-size-medium;
    color     : @color-text-d;
  }
}
</style>
