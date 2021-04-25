<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :pageIndex="0" />
</template>

<script>
import StaticPart from './StaticPart'
import Nearby from './nearby'
import Docker from '../../components/Docker'
export default {
  name: 'Home',
  components: {
    StaticPart,
    Nearby,
    Docker
  }
}
</script>
<style lang="scss" scoped>
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
</style>
