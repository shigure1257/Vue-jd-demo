<template>
  <section class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="handleClickBack">&#xe600;</div>
      <h1 class="top__header__title">管理收货地址</h1>
      <div class="top__header__create" @click="handleclickcreate">新建</div>
    </div>
  </section>
  <section class="content__wrapper">
    <h1 class="address__title">我的收货地址</h1>
    <router-link :to="`/useraddress/edit/${1}`">
      <div class="receiver">
        <div class="receiver__info">
          <span class="receiver__info__name">小慕</span>
          <span class="receiver__info__tel">18911024266</span>
        </div>
        <div class="receiver__address">北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 10层</div>
        <div class="iconfont receiver__inter">&#xe600;</div>
      </div>
    </router-link>
    <!-- <div class="receiver">
      <div class="receiver__info">
        <span class="receiver__info__name">小慕</span>
        <span class="receiver__info__tel">18911024266</span>
      </div>
      <div class="receiver__address">北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 10层</div>
      <div class="iconfont receiver__inter">&#xe600;</div>
    </div>-->
    <router-link :to="`/useraddress/edit/${2}`">
      <div class="receiver">
        <div class="receiver__info">
          <span class="receiver__info__name">小慕</span>
          <span class="receiver__info__tel">18911024266</span>
        </div>
        <div class="receiver__address">北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 13层</div>
        <div class="iconfont receiver__inter">&#xe600;</div>
      </div>
    </router-link>
    <!-- <div class="receiver">
      <div class="receiver__info">
        <span class="receiver__info__name">小慕</span>
        <span class="receiver__info__tel">18911024266</span>
      </div>
      <div class="receiver__address">北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 13层</div>
      <div class="iconfont receiver__inter">&#xe600;</div>
    </div>-->
  </section>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'AddressList',
  setup () {
    const router = useRouter()
    const handleClickBack = () => {
      router.back()
    }
    const handleclickcreate = () => {
      router.push({ name: 'Address' })
    }
    return { handleClickBack, handleclickcreate }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.top {
  height: 0.44rem;
  &__header {
    box-sizing: border-box;
    padding: 0.11rem 0 0.11rem 0;
    line-height: 0.22rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $content-fontcolor;
    &__title {
      font-size: 0.16rem;
    }
    &__back {
      font-size: 0.22rem;
      color: #b6b6b6;
      margin-left: 0.18rem;
    }
    &__create {
      margin-right: 0.18rem;
      font-size: 0.14rem;
    }
  }
}
.content__wrapper {
  overflow-y: scroll;
  padding: 0.16rem 0.18rem;
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $content-bgcolor;
}
.address__title {
  font-size: 0.14rem;
  color: $content-fontcolor;
  margin-bottom: 0.12rem;
  line-height: 0.2rem;
}
.receiver {
  background: #fff;
  position: relative;
  border-radius: 0.04rem;
  padding: 0.18rem 0.16rem;
  margin-bottom: 0.16rem;
  box-sizing: border-box;
  &__address {
    width: 2.8rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
    line-height: 0.2rem;
    @include intwoline;
  }
  &__info {
    font-size: 0.14rem;
    color: $light-fontcolor;
    line-height: 0.2rem;
    margin-bottom: 0.08rem;
    &__name {
      margin-right: 0.66rem;
    }
  }
  &__inter {
    position: absolute;
    right: 0.16rem;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
    font-size: 0.16rem;
  }
}
</style>
