<template>
  <div class="content">
    <section class="sidebar">
      <ul class="sidebar__list" @click="handleClick">
        <li
          :class="{'sidebar__item': true, 'sidebar__item--active': currentTab === item.tab}"
          v-for="item in categories"
          :key="item.name"
          :data-tab="item.tab"
        >{{item.name}}</li>
      </ul>
    </section>
    <section class="product">
      <div class="product__item" v-for="item in contentList" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" alt />
        <div class="product__item__details">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}</p>
          <div class="product__item__price">
            <span class="product__item__yen">&yen;</span>
            {{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </div>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="() => {changeCartItem(shopId, item._id, item, -1, shopName)}"
          >-</span>
          {{getProductCartCount(shopId, item._id)}}
          <span
            class="product__number__plus"
            @click="() => {changeCartItem(shopId, item._id, item, 1, shopName)}"
          >+</span>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useStore } from 'vuex'

// 商店界面商品增删逻辑
const useCartEffect = () => {
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const store = useStore()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { changeCartItem, getProductCartCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const data = reactive({
      contentList: [],
      currentTab: 'all'
    })
    const categories = [{
      name: '全部商品',
      tab: 'all'
    }, {
      name: '秒杀',
      tab: 'seckill'
    }, {
      name: '新鲜水果',
      tab: 'fruit'
    }, {
      name: '休闲食品',
      tab: 'snack'
    }, {
      name: '时令蔬菜',
      tab: 'vagatables'
    }, {
      name: '肉蛋家禽',
      tab: 'meat'
    }]
    const currParams = reactive({ tab: 'all' })
    const route = useRoute()
    const shopId = route.params.id
    // 记录购物车购入商品数量并计算价格
    const { cartList } = useCommonCartEffect()
    // 修改商店名称
    const { changeCartItem, getProductCartCount } = useCartEffect()
    // 初始化页面
    const getContentData = async () => {
      const result = await get(`/api/shop/${shopId}/products`, currParams)
      if (result?.errno === 0 && result?.data?.length) {
        data.contentList = result.data
      }
    }

    // 点击侧边栏展示不同商品
    const handleClick = (e) => {
      currParams.tab = e.target.getAttribute('data-tab')
      data.currentTab = e.target.getAttribute('data-tab')
      get(`/api/shop/${shopId}/products`, currParams).then(res => {
        if (res?.errno === 0 && res?.data?.length) {
          data.contentList = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
    // 初始化
    getContentData()
    const { contentList, currentTab } = toRefs(data)
    return { getProductCartCount, cartList, contentList, handleClick, currentTab, categories, shopId, changeCartItem }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  top: 1.54rem;
}
.sidebar {
  width: 20.266666%;
  height: 100%;
  overflow-y: scroll;
  background: $search-bgcolor;
  &__item {
    height: 0.4rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
    line-height: 0.4rem;
    text-align: center;
    &--active {
      background: #fff;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
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
    &__sales {
      font-size: 0.12rem;
      color: $content-fontcolor;
      line-height: 0.16rem;
      margin: 0.06rem 0;
    }
    &__price {
      font-size: 0.14rem;
      color: $highlight-fontcolor;
      line-height: 0.2rem;
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
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      display: flex;
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
</style>
