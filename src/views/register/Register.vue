<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img" />
    <form>
      <div class="wrapper__input">
        <input type="text" class="wrapper__input__content" placeholder="请输入手机号" v-model="username" />
      </div>
      <div class="wrapper__input">
        <input
          type="password"
          class="wrapper__input__content"
          placeholder="请输入密码"
          v-model="password"
        />
      </div>
      <div class="wrapper__input">
        <input
          type="password"
          class="wrapper__input__content"
          placeholder="确认密码"
          v-model="passwordConfirm"
        />
      </div>
    </form>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <router-link to="{ name: Register }">
      <div class="wrapper__register-link">已有账号去登陆</div>
    </router-link>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import Toast, { useToastEffect } from '../../components/Toast'
import { post } from '../../utils/request'

const useRegisterEffect = showToast => {
  const data = reactive({
    username: '',
    password: '',
    passwordConfirm: ''
  })
  const router = useRouter()
  // 注册相关逻辑
  const handleRegister = async () => {
    try {
      const { username, password, passwordConfirm } = data
      if (!username || !password || !passwordConfirm) {
        showToast('注册信息不全')
        return
      } else if (password !== passwordConfirm) {
        showToast('两次输入的密码不一致')
        return
      }
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        router.push({ name: 'Home' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      console.log('erro')
    }
  }
  const { username, password, passwordConfirm } = toRefs(data)
  return { username, password, passwordConfirm, handleRegister }
}
export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const {
      username,
      password,
      passwordConfirm,
      handleRegister
    } = useRegisterEffect(showToast)
    return {
      show,
      toastMessage,
      username,
      password,
      passwordConfirm,
      handleRegister
    }
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
  &__register-button {
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
  &__register-link {
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
    text-align: center;
  }
}
</style>
