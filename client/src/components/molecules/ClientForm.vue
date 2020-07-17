<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{title}}</p>
    </header>

    <section class="modal-card-body">
      <b-field label="Name">
        <b-input
          type="text"
          v-model="client.name"
          placeholder="Name"
          required>
        </b-input>
      </b-field>

      <b-field label="Email">
        <b-input
          type="email"
          v-model="client.email"
          placeholder="Email"
          required>
        </b-input>
      </b-field>

      <b-field label="Phone">
        <b-input
          type="text"
          v-model="client.phone"
          password-reveal
          placeholder="Phone"
          required>
        </b-input>
      </b-field>

      <b-field label="Providers">
        <providers-input
          :providers="providers.value"
          :loading="providers.loading"
          v-model="client.providers"
          @create="createProvider"
          @remove="removeProvider"
        >
        </providers-input>
      </b-field>
    </section>

    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">Close</button>
      <button class="button is-primary" @click="$emit('submit', client)">Login</button>
    </footer>
  </div>
</template>

<script>
  import ProvidersInput from '@/components/inputs/ProvidersInput'

  export default {
    components: { ProvidersInput },
    props: ['title', 'providers', 'client'],
    methods: {
      createProvider (data) {
        this.$emit('createProvider', data)
      },
      removeProvider (data) {
        this.$emit('removeProvider', data)
      },
    },
  }
</script>

