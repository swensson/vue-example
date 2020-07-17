<template>
  <div>
    <create-client></create-client>
    <clients-table></clients-table>
  </div>
</template>

<script>
  import CreateClient from '@/components/containers/CreateClient'
  import ClientsTable from '@/components/containers/ClientsTable'

  export default {
    components: { CreateClient, ClientsTable },
  }
</script>
