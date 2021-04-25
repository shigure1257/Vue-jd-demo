<template>
  <section class="docker">
    <div
      v-for="(item, index) in dockerlist"
      :class="{ 'docker__item': true, 'docker__item--active': index === pageIndex }"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div>{{item.text}}</div>
      </router-link>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Docker',
  props: ['pageIndex'],
  setup () {
    const dockerlist = [
      { icon: '&#xe642', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe61a', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe616', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe790', text: '我的', to: { name: 'User' } }
    ]
    return { dockerlist }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/viriables.scss';
.docker {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0.49rem;
  width: 100%;
  border-top: 1px solid $content-bgcolor;
  padding: 0 0.18rem;
  box-sizing: border-box;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
  color: $content-fontcolor;
}
</style>
