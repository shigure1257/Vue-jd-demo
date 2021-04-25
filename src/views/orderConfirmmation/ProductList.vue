<template>
  <div class="products">
    <div class="products__title">
      <b>{{shopName}}</b>
    </div>
    <div class="products__wrapper">
      <div class="products__list">
        <div class="products__item" v-for="item in checkedproductList" :key="item._id">
          <img class="products__item__img" :src="item.imgUrl" />
          <div class="products__item__details">
            <h4 class="products__item__title">{{item.name}}</h4>
            <div class="products__item__price">
              <span class="products__item__single">
                <span class="products__item__yen">&yen;</span>
                <span>{{item.price}} x {{item.count}}</span>
              </span>
              <span class="products__item__total">
                <span class="products__item__yen">&yen;</span>
                <span>{{(item.count * item.price).toFixed(2)}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { computed } from 'vue'
export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { cartList, shopName } = useCommonCartEffect(shopId)
    // 展示购物车中已勾选的商品
    const checkedproductList = computed(() => {
      const productList = cartList[shopId]?.productList || {}
      const checkedItemList = {}
      for (const i in productList) {
        const product = productList[i]
        if (product.check && product.count > 0) {
          checkedItemList[i] = product
        }
      }
      return checkedItemList
    })
    return { checkedproductList, shopName }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.products {
  background: #fff;
  padding: 0.16rem;
  margin: 0.16rem 0.18rem;
  &__title {
    font-size: 16px;
    color: $content-fontcolor;
    margin-bottom: 0.16rem;
  }
  &__wrapper {
    overflow-y: scroll;
    position: absolute;
    margin: 0 0.18rem;
    top: 2.61rem;
    left: 0;
    right: 0;
    bottom: 0.7rem;
  }
  &__list {
    background: #fff;
    padding: 0 0.16rem;
  }
  &__item {
    display: flex;
    align-items: center;
    height: 0.46rem;
    padding-bottom: 0.16rem;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__details {
      flex: 1;
    }
    &__title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      font-weight: bold;
      @include ellipsis;
    }
    &__price {
      display: flex;
      font-size: 0.14rem;
      color: $highlight-fontcolor;
      line-height: 0.2rem;
      margin-top: 0.06rem;
    }
    &__single {
      width: 1rem;
      color: $highlight-fontcolor;
    }
    &__yen {
      font-size: 0.1rem;
      line-height: 0.14rem;
    }
    &__total {
      flex: 1;
      color: #000;
      text-align: right;
    }
  }
}
</style>
