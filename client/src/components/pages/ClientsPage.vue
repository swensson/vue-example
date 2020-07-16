<template>
  <div>
    Clients Page {{value}}
    <button class="btn btn-primary" @click="increment()">Increment</button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { INCREMENT_COUNTER, GET_COUNTER } from '@/store/modules/counter'

  export default {
    methods: {
      ...mapActions({
        increment: INCREMENT_COUNTER
      }),
    },
    computed: {
      ...mapGetters({
        value: GET_COUNTER
      }),
    },
  }
</script>

<style>

</style>

