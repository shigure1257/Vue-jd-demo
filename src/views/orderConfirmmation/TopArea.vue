<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="handleClickBack">&#xe600;</div>确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__receiver__info">
        <span class="receiver__info__name">瑶妹（先生）</span>
        <span class="receiver__info__tel">18911024266</span>
      </div>
      <div class="iconfont top__receiver__inter">&#xe600;</div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleClickBack = () => {
      router.back()
    }
    return { handleClickBack }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(
    0deg,
    rgba(0, 145, 255, 0) 4%,
    $button-bgcolor 50%
  );
  background-repeat: no-repeat;
  &__header {
    padding-top: 0.2rem;
    display: flex;
    align-items: center;
    font-size: 0.16rem;
    text-align: center;
    color: #fff;
    &__back {
      font-size: 0.22rem;
      margin: 0 1.15rem 0 0.18rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: #fff;
    border-radius: 0.04rem;
    padding: 0.16rem;
    box-sizing: border-box;
    &__title {
      font-size: 0.16rem;
      color: $content-fontcolor;
      line-height: 0.22rem;
      margin-bottom: 0.14rem;
    }
    &__address {
      font-size: 0.14rem;
      color: $content-fontcolor;
      line-height: 0.2rem;
      margin-bottom: 0.06rem;
    }
    &__info {
      font-size: 0.12rem;
      color: $medium-fontcolor;
      line-height: 0.18rem;
    }
    &__inter {
      position: absolute;
      right: 0.16rem;
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
      font-size: 0.16rem;
    }
  }
  .receiver__info__name {
    margin-right: 0.06rem;
  }
}
</style>
