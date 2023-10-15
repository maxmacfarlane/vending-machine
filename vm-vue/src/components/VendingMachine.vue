<template>
  <div class="vending-machine">
    <div class="vending-machine-items">
      <div class="display-case"></div>
      <div class="vending-machine-product-delivery-bin"></div>
    </div>
    <div class="vending-machine-operations">
      <div class="keypad-container">
        <Keypad />
      </div>
    </div>
  </div>
</template>

<script>
import Keypad from '@/components/MachineKeypad.vue'

export default {
  components: { Keypad }
}
</script>

<style scoped>
.vending-machine {
  display: flex;
  height: 75vh;
  width: 85%;
  background-color: grey;
  border: solid grey 10px;
  border-radius: 10px;
}
.vending-machine-items {
  background-color: white;
  margin: .5rem;
  width: 100%;
  height: 97.5%;
}
.vending-machine-operations {
  background-color: black;
  margin: .5rem;
}
.display-case {
  background-color: white;
  height: 80%;
}
.vending-machine-product-delivery-bin {
  background-color: black;
  height: 20%;
}
</style>
