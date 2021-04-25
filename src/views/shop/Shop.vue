<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleback">&#xe600;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe69a;</span>
        <input class="search__content__bar" type="text" placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfo :item="item" :hideborder="true" vv-show="item.imgUrl" />
  </div>
  <Content :shopName="item.name" />
  <Cart />
</template>
<script>
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'
import { get } from '../../utils/request'
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'

// 获取当前商铺信息
const useShopEffect = () => {
  const data = reactive({ item: {} })
  const route = useRoute()
  const getShopData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getShopData }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const router = useRouter()
    const { item, getShopData } = useShopEffect()
    getShopData()
    // 返回上一页面
    const handleback = () => {
      router.back()
    }
    return { item, handleback }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  padding: 0 0.18rem;
}
.search {
  margin: 0.16rem 0 0.04rem 0;
  display: flex;
  width: 100%;
  height: 0.32rem;
  align-items: center;
  &__back {
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    width: 100%;
    height: 0.32rem;
    align-items: center;
    background: $search-bgcolor;
    border-radius: 16px;
    margin-left: 0.16rem;
    padding: 0 0.16rem;
    box-sizing: border-box;
    &__icon {
      font-size: 0.16rem;
      margin-right: 0.12rem;
      color: $search-fontcolor;
    }
    &__bar {
      flex: 1;
      background: none;
      line-height: 0.16rem;
      font-size: 0.14rem;
      border: none;
      outline: none;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
