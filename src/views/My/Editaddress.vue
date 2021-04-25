<template>
  <section class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="handleClickBack">&#xe600;</div>
      <h1 class="top__header__title">编辑收货地址</h1>
      <div class="top__header__create">保存</div>
    </div>
  </section>
  <section class="content__wrapper">
    <div class="address">
      <div class="address__info">
        <span class="address__city">所在城市：</span>
        <input class="address__input" type="text" placeholder="如北京市" v-model="city" />
      </div>
      <div class="address__info">
        <span class="address__living">小区/大厦/学校：</span>
        <input class="address__input" type="text" placeholder="如理工大学国防科技园" v-model="living" />
      </div>
      <div class="address__info">
        <span class="address__house">楼号-门牌号：</span>
        <input class="address__input" type="text" placeholder="A号楼B层" v-model="door" />
      </div>
      <div class="address__info">
        <span class="address__receiver">收货人：</span>
        <input class="address__input" type="text" placeholder="请填写收货人的姓名" v-model="receiver" />
      </div>
      <div class="address__info">
        <span class="address__tel">联系电话：</span>
        <input class="address__input" type="text" placeholder="请填写收货手机号" v-model="tel" />
      </div>
    </div>
  </section>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Editaddress',
  setup () {
    const data = reactive({
      city: '北京市',
      living: '北理工大学国防科技园',
      door: '2号楼10层',
      receiver: '小慕',
      tel: '18911023277'
    })
    const router = useRouter()
    const handleClickBack = () => {
      router.back()
    }
    const { city, living, door, receiver, tel } = toRefs(data)
    return { handleClickBack, city, living, door, receiver, tel }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
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
  position: absolute;
  top: 0.44rem;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $content-bgcolor;
}
.address {
  margin-top: 0.12rem;
  padding: 0 0.18rem;
  background-color: #fff;
  &__info {
    line-height: 0.44rem;
    border-bottom: 0.01rem $content-bgcolor solid;
    span {
      font-size: 0.14rem;
      color: $medium-fontcolor;
      line-height: 0.2rem;
    }
  }
  &__input {
    font-size: 0.14rem;
    border: none;
    line-height: 0.2rem;
    color: $medium-fontcolor;
    outline: none;
  }
  &__input::placeholder {
    font-size: 0.14rem;
    color: $light-fontcolor;
  }
  &__info:nth-child(5) {
    border-bottom: none;
  }
}
</style>
