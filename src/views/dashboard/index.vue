<template>
  <div class="dashboard-container">
	
     <img width="100%" src="@/assets/images/1222.png" />
	
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: '首页',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

</style>
