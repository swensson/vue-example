<template>
  <div>
    <b-loading :is-full-page="false" :active.sync="clients.loading"></b-loading>
    <b-table :data="clients.value" :columns="columns"></b-table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { FETCH_CLIENTS, GET_CLIENTS } from '@/store/modules/clients'

  export default {
    created() {
      this._fetchClients()
    },

    methods: {
      ...mapActions({
        _fetchClients: FETCH_CLIENTS
      }),
    },

    computed: {
      ...mapGetters({
        clients: GET_CLIENTS
      }),
    },

    data() {
      return {
        columns: [
          { field: 'name', label: 'Name' },
          { field: 'email', label: 'Email' },
          { field: 'phone', label: 'Phone', centered: true },
          { field: 'providers', label: 'Providers' },
        ]
      }
    }
  }
</script>
