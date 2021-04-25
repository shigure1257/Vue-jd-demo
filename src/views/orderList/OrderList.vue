<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item,index) in list" :key="index">
        <div class="order__title">
          {{item.shopName}}
          <span class="order__status">{{item.isCanceled ? '已取消' : '已下单'}}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(productitem,innerIndex) in item.products" :key="innerIndex">
              <img
                class="order__content__img"
                :src="productitem.product.img"
                v-if="innerIndex <= 3"
              />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">¥{{item.totalPrice}}</div>
            <div class="order__content__count">共{{item.totalNumber}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :pageIndex="2" />
</template>
<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker'
// 展示已购订单的商品缩略图
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearByList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach(eachorder => {
        const products = eachorder.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach(item => {
          totalNumber += (item?.orderSales || 0)
          totalPrice += (item?.orderSales * item.product?.price) || 0
        })
        eachorder.totalPrice = totalPrice
        eachorder.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getNearByList()
  const { list } = toRefs(data)
  return { list }
}
export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.5rem;
  overflow: auto;
  background: rgb(248, 248, 248);
}
.title {
  background: #ffffff;
  line-height: 0.44rem;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
}
.order {
  margin: 0.16rem 0.18rem;
  background: #fff;
  padding: 0.16rem;
  &__title {
    margin-bottom: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__status {
    font-size: 0.14rem;
    color: $light-fontcolor;
    float: right;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
    &__info {
      width: 0.7rem;
      text-align: right;
    }
    &__price {
      font-size: 0.14rem;
      color: $highlight-fontcolor;
      line-height: 0.2rem;
      margin-bottom: 0.04rem;
    }
    &__count {
      font-size: 0.12rem;
      color: $content-fontcolor;
      line-height: 0.14rem;
    }
  }
}
</style>
