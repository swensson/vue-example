<template>
  <div class="clients-page">
    <div class="clients-page__title">
      <h2 class="clients-page__title-text">Manage Clients</h2>
      <create-client></create-client>
    </div>

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

<style>
  .clients-page {
    max-width: 1080px;
    margin: 0 auto;
    padding-top: 80px;
    min-height: calc(100vh - 60px);
  }

  .clients-page__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .clients-page__title-text {
    font-size: 32px;
    font-weight: bold;
  }
</style>
