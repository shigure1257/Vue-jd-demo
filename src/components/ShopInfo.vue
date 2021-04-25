<template>
  <div class="shop">
    <img :src="item.imgUrl" alt class="shop__img" />
    <div
      :class="{
        shop__content: true,
        'shop__content--bordered': hideborder ? false : true,
      }"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售: {{ item.sales }}</span>
        <span class="shop__content__tag">起送: {{ item.expressLimit }}</span>
        <span class="shop__content__tag">基础运费: {{ item.expressPrice }}</span>
      </div>
      <p class="shop__content__hightlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideborder']
}
</script>
<style lang="scss" scoped>
@import '../style/viriables.scss';
.shop {
  display: flex;
  padding-top: 0.12rem;
  &__img {
    width: 0.56rem;
    height: 0.56rem;
  }
  &__content {
    flex: 1;
    margin-left: 0.16rem;
    padding-bottom: 0.12rem;
    &--bordered {
      border-bottom: 0.01rem solid $content-bgcolor;
    }
    &__title {
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: $content-fontcolor;
    }
    &__tags {
      line-height: 0.18rem;
      font-size: 0.13rem;
      margin-top: 0.08rem;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__hightlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $highlight-fontcolor;
    }
  }
}
</style>
