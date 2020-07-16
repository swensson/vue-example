<template>
  <div>
    Clients Page {{value}}
    <button class="btn btn-primary" @click="increment()">Increment</button>
    <clients-table></clients-table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { INCREMENT_COUNTER, GET_COUNTER } from '@/store/modules/counter'

  import ClientsTable from '@/components/molecules/ClientsTable'

  export default {
    components: { ClientsTable },
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

