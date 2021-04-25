<template>
  <div class="header">
    <h1 class="title">我的全部购物车（3）</h1>
  </div>
  <section class="purcherse contentwrapper">
    <!-- 循环展示各个商店中加入购物车的商品（目前仅有一个商店）,没有把商店的商品加入购物车则不展示 -->
    <template v-for="item in purcherseList" :key="item.shopName">
      <div class="purcherse__order" v-if="item.productList.length > 0">
        <div class="purcherse__title">
          <b>{{item.shopName}}</b>
        </div>
        <div class="purcherse__list">
          <template v-for="(productitem, innerindex) in item.productList" :key="productitem._id">
            <div
              class="purcherse__item"
              v-if="productitem.count > 0 && (innerindex < 2 || showall)"
            >
              <img class="purcherse__item__img" :src="productitem.imgUrl" />
              <div class="purcherse__item__details">
                <h4 class="purcherse__item__title">{{productitem.name}}</h4>
                <div class="purcherse__item__price">
                  <span class="purcherse__item__single">
                    <span class="purcherse__item__yen">&yen;</span>
                    <span>{{productitem.price}} x {{productitem.count}}</span>
                  </span>
                  <span class="purcherse__item__total">
                    <span class="purcherse__item__yen">&yen;</span>
                    <span>{{(productitem.count * productitem.price).toFixed(2)}}</span>
                  </span>
                </div>
              </div>
            </div>
          </template>
          <div
            class="purcherse__more"
            v-show="item.productList.length > 2 && !showall"
            @click="handleclickshowALL"
          >
            <p>共计{{item.productList.length}}件/1.4kg</p>
            <div class="purcherse__extend iconfont">&#xe600;</div>
          </div>
        </div>
      </div>
    </template>
    <!-- 静态html -->
    <div class="purcherse__order">
      <div class="purcherse__title">
        <b>京东7FRESH七鲜</b>
      </div>
      <div class="purcherse__list">
        <div class="purcherse__item">
          <img class="purcherse__item__img" src="http://www.dell-lee.com/imgs/vue3/cherry.png" />
          <div class="purcherse__item__details">
            <h4 class="purcherse__item__title">提子250g/份</h4>
            <div class="purcherse__item__price">
              <span class="purcherse__item__single">
                <span class="purcherse__item__yen">&yen;</span>
                <span>33.6 x 3</span>
              </span>
              <span class="purcherse__item__total">
                <span class="purcherse__item__yen">&yen;</span>
                <span>99.9</span>
              </span>
            </div>
          </div>
        </div>
        <div class="purcherse__item">
          <img class="purcherse__item__img" src="http://www.dell-lee.com/imgs/vue3/orange.png" />
          <div class="purcherse__item__details">
            <h4 class="purcherse__item__title">橙子250g/份</h4>
            <div class="purcherse__item__price">
              <span class="purcherse__item__single">
                <span class="purcherse__item__yen">&yen;</span>
                <span>33.6 x 3</span>
              </span>
              <span class="purcherse__item__total">
                <span class="purcherse__item__yen">&yen;</span>
                <span>99.9</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 静态html -->
    <div class="purcherse__order">
      <div class="purcherse__title">
        <b>百果园</b>
      </div>
      <div class="purcherse__list">
        <div class="purcherse__item">
          <img class="purcherse__item__img" src="http://www.dell-lee.com/imgs/vue3/cherry.png" />
          <div class="purcherse__item__details">
            <h4 class="purcherse__item__title">提子250g/份</h4>
            <div class="purcherse__item__price">
              <span class="purcherse__item__single">
                <span class="purcherse__item__yen">&yen;</span>
                <span>33.6 x 3</span>
              </span>
              <span class="purcherse__item__total">
                <span class="purcherse__item__yen">&yen;</span>
                <span>99.9</span>
              </span>
            </div>
          </div>
        </div>
        <div class="purcherse__item">
          <img class="purcherse__item__img" src="http://www.dell-lee.com/imgs/vue3/orange.png" />
          <div class="purcherse__item__details">
            <h4 class="purcherse__item__title">橙子250g/份</h4>
            <div class="purcherse__item__price">
              <span class="purcherse__item__single">
                <span class="purcherse__item__yen">&yen;</span>
                <span>33.6 x 3</span>
              </span>
              <span class="purcherse__item__total">
                <span class="purcherse__item__yen">&yen;</span>
                <span>99.9</span>
              </span>
            </div>
          </div>
        </div>
        <div class="purcherse__more">
          <p>共计5件/4.4kg</p>
          <div class="purcherse__extend iconfont">&#xe600;</div>
        </div>
      </div>
    </div>
  </section>
  <Docker :pageIndex="1" />
</template>
<script>
import { useCommonCartEffect } from '../../effects/cartEffects'
import Docker from '../../components/Docker'
import { computed, ref } from 'vue'

const usepurcherseEffect = () => {
  const { cartList } = useCommonCartEffect()
  const showall = ref(false)
  // 展示购物车相关逻辑
  // 各个商店加入购物车的商品列表 {shopName:商店名称, productList: [商品1,商品2,...]}
  const purcherseList = computed(() => {
    const purcherseList = {}
    for (const i in cartList) {
      purcherseList[i] = {}
      const shopName = cartList[i]?.shopName
      const productList = cartList[i]?.productList || {}
      const purcherseitemList = []
      for (const i in productList) {
        const item = productList[i]
        if (item.count > 0) {
          purcherseitemList.push(item)
        }
      }
      purcherseList[i].shopName = shopName
      purcherseList[i].productList = purcherseitemList
    }
    return purcherseList
  })
  // 点击展开购物车
  const handleclickshowALL = () => {
    showall.value = true
  }
  return { purcherseList, handleclickshowALL, showall }
}
export default {
  name: 'CartList',
  components: { Docker },
  setup () {
    const { purcherseList, handleclickshowALL, showall } = usepurcherseEffect()
    return { purcherseList, showall, handleclickshowALL }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.header {
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.16rem;
  color: $content-fontcolor;
}
.contentwrapper {
  background-color: #f8f8f8;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  top: 0.44rem;
  overflow-y: scroll;
}
.purcherse {
  &__order {
    background-color: #fff;
    margin: 0.16rem 0.18rem;
    padding: 0.16rem;
    box-sizing: border-box;
  }
  &__title {
    font-size: 0.16rem;
    color: $content-fontcolor;
    line-height: 0.22rem;
  }
  &__item {
    display: flex;
    align-items: center;
    height: 0.46rem;
    padding-top: 0.16rem;
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
  &__more {
    margin-top: 0.16rem;
    background-color: #f5f5f5;
    height: 0.28rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__extend {
    margin-left: 0.08rem;
    transform: rotate(270deg);
  }
}
</style>
