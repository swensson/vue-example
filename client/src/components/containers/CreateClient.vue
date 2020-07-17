<template>
  <section>
    <button
      class="button is-primary is-medium"
      @click="isComponentModalActive = true"
    >
      Create Client
    </button>

    <b-modal
      aria-modal
      trap-focus
      has-modal-card
      aria-role="dialog"
      :active.sync="isComponentModalActive"
      :destroy-on-hide="false"
    >
      <client-form
        title="Create Client"
        :client="client"
        :providers="providers"
        @submit="createNewClient"
        @close="isComponentModalActive = false"
        @createProvider="createProvider"
        @removeProvider="removeProvider"
      ></client-form>
    </b-modal>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { FETCH_PROVIDERS, GET_PROVIDERS, CREATE_PROVIDER, REMOVE_PROVIDER } from '@/store/modules/clients'
  import ClientForm from '@/components/molecules/ClientForm'

  export default {
    components: {
      ClientForm
    },

    created () {
      this.fetchProviders()
    },

    computed: {
      ...mapGetters({
        providers: GET_PROVIDERS
      }),
    },

    methods: {
      ...mapActions({
        fetchProviders: FETCH_PROVIDERS,
        _createProvider: CREATE_PROVIDER,
        _removeProvider: REMOVE_PROVIDER,
      }),
      createNewClient ({ name, email, phone, providers }) {
        // console.log(name, email, phone, providers)
      },
      createProvider (name) {
        this._createProvider({ name })
      },
      removeProvider (id) {
        this._removeProvider(id)
      },
    },

    data() {
      return {
        isComponentModalActive: false,
        client: {
          name: '',
          email: '',
          phone: '',
          providers: []
        }
      }
    }
  }
</script>