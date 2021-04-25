<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img" />
    <form method="post">
      <div class="wrapper__input">
        <input type="text" class="wrapper__input__content" placeholder="请输入用户名" v-model="username" />
      </div>
      <div class="wrapper__input">
        <input
          type="password"
          class="wrapper__input__content"
          placeholder="请输入密码"
          v-model="password"
        />
      </div>
    </form>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link">
      <router-link :to="{ name: 'Register'}">
        <span class="wrapper__login-link__reg">立即注册</span>
      </router-link>
      <span class="wrapper__login-link__back">忘记密码</span>
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

const useLoginEffect = (showToast) => {
  const data = reactive({
    username: '',
    password: ''
  })
  const router = useRouter()

  // 登录相关逻辑
  const handleLogin = async () => {
    try {
      const { username, password } = data
      if (username === '' || password === '') {
        showToast('请输入用户名和密码')
        return
      }
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}
export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)

    return { handleLogin, username, password, show, toastMessage }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin: 0 0.4rem;
  transform: translateY(-50%);
  &__img {
    width: 0.66rem;
    height: 0.66rem;
    display: block;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    height: 0.48rem;
    margin-bottom: 0.16rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.02rem;
    border-radius: 0.02rem;
    &__content {
      width: 100%;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
      border: none;
      outline: none;
      line-height: 0.48rem;
      padding: 0 0.16rem;
      box-sizing: border-box;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login-button {
    margin: 0.32rem 0 0.16rem 0;
    line-height: 0.48rem;
    background: $button-bgcolor;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: #fff;
    text-align: center;
    font-size: 0.16rem;
  }
  &__login-link {
    padding: 0 0.76rem;
    display: flex;
    &__back {
      flex: 1;
      font-size: 0.14rem;
      color: $content-notice-fontcolor;
      margin-left: 0.13rem;
    }
    &__reg {
      font-size: 0.14rem;
      color: $content-notice-fontcolor;
    }
    .a {
      flex: 1;
      margin-right: 0.13rem;
    }
  }
}
</style>
