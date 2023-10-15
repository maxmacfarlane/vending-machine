<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Test</router-link>
  </nav>
  <main>
    <router-view/>
  </main>

</template>

<style>
main {
  overflow-x: hidden;
}
</style>
