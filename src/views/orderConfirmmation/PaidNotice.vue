<template>
  <div class="mask__content" @click.stop>
    <div class="mask__content__icon iconfont" v-html="flag ? '&#xe663;' : '&#xe867;'"></div>
    <p class="mask__content__notice">{{message}}</p>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'PaidNotice',
  props: ['message', 'flag']
}
// 下单状态提示弹窗
export const useNoticeEffect = () => {
  const NoticeData = reactive({
    show: false,
    NoticeMessage: '',
    NoticeiconFlag: true
  })
  const showNotice = (flag, message) => {
    NoticeData.show = true
    NoticeData.NoticeMessage = message
    NoticeData.NoticeiconFlag = flag
    setTimeout(() => {
      NoticeData.show = false
      NoticeData.NotcieMessage = ''
    }, 2000)
  }
  const { show, NoticeMessage, NoticeiconFlag } = toRefs(NoticeData)
  return { show, NoticeMessage, NoticeiconFlag, showNotice }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
.mask__content {
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
  &__icon {
    color: #000;
    font-size: 0.5rem;
    margin-bottom: 0.2rem;
  }
  &__notice {
    font-size: 0.18rem;
    color: $content-fontcolor;
    line-height: 0.26rem;
    font-weight: bold;
  }
}
</style>
