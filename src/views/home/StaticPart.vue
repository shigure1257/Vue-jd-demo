<template>
  <section class="position">
    <span class="iconfont position__icon">&#xe60e;</span>
    北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层
    <span
      class="iconfont position__bell"
    >&#xe7c4;</span>
  </section>
  <section class="search">
    <span class="iconfont search__icon">&#xe69a;</span>
    <form class="search__form">
      <input type="text" class="search__bar" placeholder="山姆会员商店优惠商品" />
    </form>
  </section>
  <section class="banner">
    <a href="javascript:">
      <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="banner" />
    </a>
  </section>
  <section class="icons">
    <div class="icons__item" v-for="(item, index) in iconlist" :key="index">
      <img
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
        alt
        class="icons__item__img"
      />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </section>
  <div class="gap"></div>
</template>
<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconlist = [
      { imgName: '超市', desc: '超市' },
      { imgName: '超市', desc: '超市' },
      { imgName: '超市', desc: '超市' },
      { imgName: '超市', desc: '超市' },
      { imgName: '超市', desc: '超市' },
      { imgName: '超市', desc: '超市' },
      { imgName: '超市', desc: '超市' },
      { imgName: '超市', desc: '超市' },
      { imgName: '超市', desc: '超市' },
      { imgName: '超市', desc: '超市' }
    ]
    return { iconlist }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem;
  overflow: auto;
  padding: 0 0.18rem 0.1rem 0.18rem;
}
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  .position__icon {
    font-size: 0.2rem;
    position: relative;
    top: 0.03rem;
    margin-right: 0.07rem;
  }
  .position__bell {
    font-size: 0.2rem;
    position: absolute;
    top: 0.17rem;
    right: 0;
  }
  color: $content-fontcolor;
}
.search {
  display: flex;
  margin-bottom: 0.12rem;
  align-items: center;
  height: 0.32rem;
  width: 100%;
  color: $search-fontcolor;
  border-radius: 0.16rem;
  background: $search-bgcolor;
  padding: 0 0.16rem;
  box-sizing: border-box;
  &__icon {
    font-size: 0.16rem;
    margin-right: 0.12rem;
  }
  &__form {
    flex: 1;
  }
  &__bar {
    width: 100%;
    background: none;
    color: $search-fontcolor;
    font-size: 0.14rem;
    line-height: 0.16rem;
    outline: none;
    border: none;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      display: block;
      margin: 0 auto;
    }
    &__desc {
      text-align: center;
      margin: 0.06rem 0 0.16rem 0;
      color: $content-fontcolor;
    }
  }
}
.gap {
  height: 0.1rem;
  background: $content-bgcolor;
  margin: 0 -0.18rem;
}
</style>
