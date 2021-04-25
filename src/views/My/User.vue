<template>
  <section class="userTop">
    <div class="userTop__header">
      <img
        src="https://up.enterdesk.com/edpic/6a/e8/21/6ae821d923dc7dcb86ddabb01b66320d.jpg"
        alt
        class="userTop__header__icon"
      />
    </div>
    <div class="userTop__editor iconfont">&#xe887;</div>
    <div class="userTop__details">
      <div class="userTop__profile">
        <div class="userTop__profile__info">
          <p class="userTop__profile__name">热心市民李先生</p>
          <div class="userTop__profile__level">
            <span class="userTop__profile__levelIcon iconfont">&#xe602;</span>
            <span class="userTop__profile__levelNum">16</span>
          </div>
        </div>
        <p class="userTop__profile__id">ID: 1069643013</p>
      </div>
      <div class="userTop__item">
        <div class="userTop__item__redbag userTop__item__column">
          <p class="userTop__item__desc">红包</p>
          <p class="userTop__item__num">218</p>
        </div>
        <div class="userTop__item__coupon userTop__item__column">
          <p class="userTop__item__desc">优惠券</p>
          <p class="userTop__item__num">12张</p>
        </div>
        <div class="userTop__item__point userTop__item__column">
          <p class="userTop__item__desc">鲜豆</p>
          <p class="userTop__item__num">88</p>
        </div>
        <div class="userTop__item__debt userTop__item__column">
          <p class="userTop__item__desc">白条</p>
          <p class="userTop__item__num">1000</p>
        </div>
      </div>
    </div>
  </section>
  <section class="userMenu">
    <ul>
      <li class="userMenu__item">
        <div class="userMenu__item__icon userMenu__wallet iconfont">&#xe641;</div>
        <p class="userMenu__item__info">我的钱包</p>
        <div class="userMenu__item__entericon iconfont">&#xe600;</div>
      </li>
      <router-link to="/useraddress">
        <li class="userMenu__item">
          <div class="userMenu__item__icon userMenu__address iconfont">&#xe780;</div>
          <p class="userMenu__item__info">我的地址</p>
          <div class="userMenu__item__entericon iconfont">&#xe600;</div>
        </li>
      </router-link>
      <li class="userMenu__item">
        <div class="userMenu__item__icon userMenu__help iconfont">&#xe608;</div>
        <p class="userMenu__item__info">客服与帮助</p>
        <div class="userMenu__item__entericon iconfont">&#xe600;</div>
      </li>
    </ul>
  </section>
  <Docker :pageIndex="3" />
</template>
<script>
import Docker from '../../components/Docker'
export default {
  name: 'User',
  components: { Docker }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
.userTop {
  position: relative;
  height: 2.2rem;
  background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  border-bottom-left-radius: 90% 40%;
  border-bottom-right-radius: 90% 40%;
  &__header {
    position: absolute;
    top: 0.61rem;
    width: 0.94rem;
    height: 0.94rem;
    left: 50%;
    margin-left: -0.47rem;
    &__icon {
      display: block;
      width: 0.94rem;
      height: 0.94rem;
      border-radius: 50%;
    }
    z-index: 99;
  }
  &__editor {
    position: absolute;
    right: 0.21rem;
    top: 0.57rem;
    color: #fff;
    font-size: 0.21rem;
  }
  &__details {
    background: #ffffff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    position: absolute;
    top: 1.08rem;
    left: 0.18rem;
    right: 0.18rem;
  }
  &__profile {
    border-bottom: 0.01rem $content-bgcolor solid;
    text-align: center;
    &__name {
      margin-top: 0.6rem;
      font-size: 0.24rem;
      color: $user-fontcolor;
      line-height: 0.36rem;
    }
    &__level {
      position: absolute;
      top: 0.7rem;
      right: 0.37rem;
      width: 0.35rem;
      background-image: linear-gradient(180deg, #bee700 0%, #8aca00 100%);
      border-radius: 1rem;
      line-height: 0.15rem;
      padding: 0 0.02rem 0 0.02rem;
    }
    &__levelIcon {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      font-size: 0.1rem;
      color: #ffc700;
      margin-right: 0.04rem;
    }
    &__levelNum {
      font-size: 0.1rem;
      color: #ffffff;
    }
    &__id {
      font-size: 14px;
      color: $user-descfontcolor;
      line-height: 0.2rem;
      margin: 0.02rem 0 0.12rem 0;
    }
  }
  &__item {
    display: flex;
    &__column {
      flex: 1;
      text-align: center;
    }
    &__desc {
      margin: 0.12rem 0 0.03rem 0;
      font-size: 0.12rem;
      color: $user-descfontcolor;
      line-height: 0.18rem;
    }
    &__num {
      margin-bottom: 0.16rem;
      font-size: 0.2rem;
      line-height: 0.28rem;
      color: $user-fontcolor;
    }
  }
}
.userMenu {
  position: absolute;
  top: 3.28rem;
  left: 0.18rem;
  right: 0.18rem;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  padding: 0.16rem;
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 0.24rem;
    &__icon {
      width: 0.22rem;
      height: 0.22rem;
      line-height: 0.22rem;
      text-align: center;
      margin-right: 0.12rem;
      border-radius: 0.08rem;
      color: #fff;
      font-size: 0.14rem;
    }
    &__info {
      font-size: 0.14rem;
      color: #262626;
    }
    &__entericon {
      position: absolute;
      color: #c2c4ca;
      font-size: 0.12rem;
      line-height: 0.22rem;
      transform: rotate(180deg);
      right: 0.16rem;
    }
  }
  &__item:nth-child(3) {
    margin-bottom: 0;
  }
  &__wallet {
    background: #ed4a47;
  }
  &__address {
    background: #32c5ff;
  }
  &__help {
    background: rgba(144, 19, 254, 0.92);
  }
}
</style>
