<template>
  <div class="charge">
    <div class="charge__amount">
      <span class="charge__amount__dec">实付金额</span>
      <span class="charge__amount__totalprice">
        <b>¥{{calcuations.totalprice}}</b>
      </span>
    </div>
    <div class="charge__submit" @click="() => handleShowConfirmChange(true)">提交订单</div>
  </div>
  <div class="mask" v-show="showConfirm" @click="() => handleShowConfirmChange(false)">
    <div class="mask__content" @click.stop>
      <h2 class="mask__content__title">确认要离开收银台？</h2>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn--cancel" @click="handleCancelclick">取消订单</div>
        <div class="mask__content__btn--confirm" @click="handleChargeClick">确认支付</div>
      </div>
      <PaidNotice v-if="show" :message="NoticeMessage" :flag="NoticeiconFlag" />
    </div>
    <PaidNotice v-if="show" :message="NoticeMessage" :flag="NoticeiconFlag" />
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { post } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'
import PaidNotice, { useNoticeEffect } from './PaidNotice'
import { useStore } from 'vuex'
import { ref } from 'vue'

// 下单相关逻辑
const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter()
  const store = useStore()
  const { show, NoticeMessage, NoticeiconFlag, showNotice } = useNoticeEffect()
  const handleChargeClick = async () => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      if (product.check) {
        products.push({ id: parseInt(product._id, 10), num: product.count })
      }
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled: false,
        products
      })
      if (result?.errno === 0) {
        store.commit('clearCartProduct', { shopId })
        showNotice(true, '支付成功，等待配送')
        setTimeout(() => {
          router.push({ name: 'OrderList' })
        }, 2000)
      } else {
        showNotice(false, '下单失败')
      }
    } catch (e) {
      showNotice(false, '下单失败')
    }
  }
  const handleCancelclick = () => {
    router.push({ name: 'Shop' })
  }
  return { handleChargeClick, handleCancelclick, show, NoticeMessage, NoticeiconFlag }
}
// 蒙层展示相关的逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirmChange }
}
export default {
  name: 'Order',
  components: { PaidNotice },
  setup () {
    const route = useRoute()
    const shopId = parseInt(route.params.id)
    const { calcuations, shopName, productList } = useCommonCartEffect(shopId)
    const { handleChargeClick, handleCancelclick, show, NoticeMessage, NoticeiconFlag } = useMakeOrderEffect(shopId, shopName, productList)
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect()

    return { calcuations, handleChargeClick, handleCancelclick, show, NoticeMessage, NoticeiconFlag, showConfirm, handleShowConfirmChange }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.charge {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.49rem;
  background: #fff;
  display: flex;
  &__amount {
    flex: 1;
    line-height: 0.49rem;
    margin-left: 0.24rem;
    &__dec {
      font-size: 0.14rem;
      color: $content-fontcolor;
      margin-right: 0.05rem;
    }
    &__totalprice {
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
  }
  &__submit {
    width: 0.98rem;
    background: $submit-btncolor;
    line-height: 0.49rem;
    text-align: center;
    color: #fff;
  }
}
.mask {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.58rem;
    background: #ffffff;
    border-radius: 0.04rem;
    text-align: center;
    padding: 0.24rem 0;
    box-sizing: border-box;
    &__title {
      font-size: 0.18rem;
      color: $content-fontcolor;
      font-weight: bold;
      line-height: 0.25rem;
    }
    &__desc {
      margin-top: 0.08rem;
      font-size: 0.14rem;
      color: #666666;
    }
    &__btns {
      margin: 0.24rem 0.58rem 0 0.58rem;
      display: flex;
    }
    &__btn--cancel {
      height: 0.32rem;
      width: 0.8rem;
      line-height: 0.32rem;
      border: 1px solid $submit-btncolor;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      color: $button-bgcolor;
      box-sizing: border-box;
      margin-right: 0.12rem;
    }
    &__btn--confirm {
      height: 0.32rem;
      width: 0.8rem;
      line-height: 0.32rem;
      background: $submit-btncolor;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      color: #ffffff;
      margin-left: 0.12rem;
    }
    &__icon {
      color: #000;
      font-size: 0.5rem;
      margin-bottom: 0.24rem;
    }
    &__notice {
      font-size: 0.18rem;
      color: #333333;
      line-height: 0.26rem;
      font-weight: bold;
    }
  }
}
</style>
