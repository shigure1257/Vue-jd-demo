<template>
  <section class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link :to="`/shop/${item._id}`" v-for="item in nearbylist" :key="item._id">
      <ShopInfo :item="item" />
    </router-link>
  </section>
</template>
<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

// 获取商店列表
const useNearbyListEffect = () => {
  const nearbylist = ref([])
  const getNearByList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbylist.value = result.data
    }
  }
  return { nearbylist, getNearByList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbylist, getNearByList } = useNearbyListEffect()
    getNearByList()
    return { nearbylist }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    color: $content-fontcolor;
    font-weight: normal;
  }
  &__item {
    display: flex;
    padding-top: 0.12rem;
    &__img {
      width: 0.56rem;
      height: 0.56rem;
    }
  }
  &__content {
    flex: 1;
    margin-left: 0.16rem;
    padding-bottom: 0.12rem;
    border-bottom: 0.01rem solid $content-bgcolor;
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
      color: #e93b3b;
    }
  }
}
</style>
