<template>
  <div>
    <main-header></main-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import MainHeader from '@/components/molecules/MainHeader'

  export default { components: { MainHeader } }
</script>

<style>

</style>