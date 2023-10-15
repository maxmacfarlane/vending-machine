<template>
  <div class="home">
    <VendingMachine/>
  </div>
</template>

<script>
// @ is an alias to /src
import VendingMachine from '@/components/VendingMachine.vue'

export default {
  name: 'HomeView',
  components: {
    VendingMachine
  }
}
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
