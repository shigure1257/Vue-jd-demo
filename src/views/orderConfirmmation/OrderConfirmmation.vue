<template>
  <section class="order wrapper">
    <TopArea />
    <ProductList />
    <Order />
  </section>
</template>
<script>
import TopArea from './TopArea'
import ProductList from './ProductList'
import Order from './Order'

export default {
  name: 'OrderConfirmmation',
  components: { TopArea, ProductList, Order }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper {
  background-color: #eee;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}
</style>
