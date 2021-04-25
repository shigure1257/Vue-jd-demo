<template>
  <div class="mask" v-if="showCart && calcuations.total > 0" @click="handleShowCartChange" />
  <section class="cart">
    <div class="product" v-if="showCart && calcuations.total > 0">
      <div class="product__header">
        <div class="product__header__all">
          <span
            class="product__header__icon-checked iconfont"
            v-html="calcuations.allchecked?'&#xe65a;':'&#xe667;'"
            @click="() => setCartItemChecked(shopId)"
          ></span>
          全选
        </div>
        <div class="product__header__clear" @click="() => clearCartProduct(shopId)">清空购物车</div>
      </div>

      <div class="product__item" v-for="item in productList" :key="item._id">
        <div
          @click="() => changeCartItemChecked(shopId, item._id)"
          v-html="item.check?'&#xe65a;':'&#xe667;'"
          class="product__item__checked iconfont"
        ></div>
        <img class="product__item__img" :src="item.imgUrl" alt />
        <div class="product__item__details">
          <h4 class="product__item__title">{{item.name}}</h4>
          <div class="product__item__price">
            <span class="product__item__yen">&yen;</span>
            {{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </div>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="() => {changeCartItemInfo(shopId, item._id, item, -1)}"
          >-</span>
          {{item.count || 0}}
          <span
            class="product__number__plus"
            @click="() => {changeCartItemInfo(shopId, item._id, item, 1)}"
          >+</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          class="check__icon__img"
          @click="handleShowCartChange"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
        />
        <div class="check__icon__tag" v-if="calcuations.total < 100">{{calcuations.total}}</div>
        <div class="check__icon__tag" v-else>99+</div>
      </div>
      <div class="check__info">
        总计：
        <span class="check__info__price">&yen;{{calcuations.totalprice}}</span>
      </div>
      <div class="check__btn" v-show="calcuations.total">
        <router-link :to="`/orderConfirmmation/${shopId}`">去结算</router-link>
      </div>
    </div>
  </section>
</template>
<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useCommonCartEffect } from '../../effects/cartEffects'

const useCartEffect = (showCart) => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const { changeCartItemInfo, cartList, productList, calcuations } = useCommonCartEffect(shopId)

  // 是否勾选商品
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', {
      shopId, productId
    })
  }
  // 清空购物车
  const clearCartProduct = (shopId) => {
    store.commit('clearCartProduct', { shopId })
    showCart.value = false
  }
  // 一键全选
  const setCartItemChecked = (shopId) => {
    store.commit('setCartItemChecked', { shopId })
  }
  return { calcuations, productList, shopId, cartList, changeCartItemInfo, changeCartItemChecked, clearCartProduct, setCartItemChecked }
}
// 点击展示购物车简略图
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleShowCartChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleShowCartChange }
}
export default {
  name: 'Cart',
  setup () {
    const { showCart, handleShowCartChange } = toggleCartEffect()
    const { calcuations, productList, shopId, cartList, changeCartItemInfo, changeCartItemChecked, clearCartProduct, setCartItemChecked } = useCartEffect(showCart)
    return {
      calcuations, showCart, productList, changeCartItemInfo, shopId, cartList, changeCartItemChecked, clearCartProduct, setCartItemChecked, handleShowCartChange
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  box-shadow: 0 -1px 1px 0 $content-bgcolor;
  z-index: 9999;
}
.product {
  overflow-y: scroll;
  background: #fff;
  flex: 1;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.18rem;
    height: 0.52rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
    border-bottom: 0.01rem $content-bgcolor solid;
    &__all {
      display: flex;
      align-items: center;
    }
    &__icon-checked {
      color: $button-bgcolor;
      font-size: 0.2rem;
      margin-right: 0.08rem;
    }
  }
  &__item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.12rem 0.18rem;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__checked {
      color: $button-bgcolor;
      font-size: 0.2rem;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin: 0 0.16rem;
    }
    &__details {
      overflow: hidden;
    }
    &__title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      font-weight: bold;
      @include ellipsis;
    }
    &__price {
      font-size: 0.14rem;
      color: $highlight-fontcolor;
      line-height: 0.2rem;
      margin-top: 0.06rem;
    }
    &__yen {
      font-size: 0.1rem;
      color: $highlight-fontcolor;
      line-height: 0.14rem;
    }
    &__origin {
      font-size: 0.1rem;
      color: $light-fontcolor;
      line-height: 0.2rem;
      margin-left: 0.06rem;
      text-decoration: line-through;
    }
    .product__number {
      display: flex;
      position: absolute;
      right: 0.18rem;
      align-items: center;
      height: 0.2rem;
      &__minus,
      &__plus {
        display: flex;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        font-size: 0.2rem;
        align-items: center;
        justify-content: center;
      }
      &__minus {
        border: 0.01rem solid $medium-fontcolor;
        color: $medium-fontcolor;
        box-sizing: border-box;
        margin-right: 0.105rem;
      }
      &__plus {
        background: $button-bgcolor;
        color: #fff;
        margin-left: 0.105rem;
      }
    }
  }
}
.check {
  display: flex;
  height: 0.49rem;
  justify-content: center;
  align-items: center;
  &__icon {
    position: relative;
    width: 0.76rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &__img {
      width: 0.28rem;
      height: 0.28rem;
    }
    &__tag {
      position: absolute;
      left: 0.44rem;
      top: 0.02rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      transform: scale(0.5);
      transform-origin: left center;
      background: $highlight-fontcolor;
      font-size: 0.16rem;
      color: #ffffff;
      line-height: 0.2rem;
      border-radius: 0.1rem;
      text-align: center;
    }
  }
  &__info {
    flex: 1;
    margin-left: 0.08rem;
    font-size: 0.12rem;
    color: $content-fontcolor;
    &__price {
      font-size: 18px;
      color: $highlight-fontcolor;
    }
  }
  &__btn {
    width: 0.98rem;
    height: 100%;
    background: $submit-btncolor;
    font-size: 0.14rem;
    text-align: center;
    line-height: 0.49rem;
    a {
      color: #ffffff;
    }
  }
}
</style>
