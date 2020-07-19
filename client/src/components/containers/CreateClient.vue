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
      @close="closeModal"
      :active.sync="isComponentModalActive"
      :destroy-on-hide="false"
    >
      <client-form
        buttonLabel="Create"
        title="Create Client"
        :client="client"
        :providers="providers"
        @submit="createNewClient"
        @close="closeModal"
        @createProvider="createProvider"
        @removeProvider="removeProvider"
        @renameProvider="renameProvider"
      ></client-form>
    </b-modal>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { FETCH_PROVIDERS, CREATE_CLIENT, GET_PROVIDERS, CREATE_PROVIDER, FETCH_CLIENTS, REMOVE_PROVIDER, RENAME_PROVIDER } from '@/store/modules/clients'
  import ClientForm from '@/components/molecules/ClientForm'

  export default {
    components: {
      ClientForm
    },

    created () {
      this._fetchProviders()
    },

    computed: {
      ...mapGetters({
        providers: GET_PROVIDERS
      }),
    },

    methods: {
      ...mapActions({
        _fetchClients: FETCH_CLIENTS,
        _fetchProviders: FETCH_PROVIDERS,
        _createClient: CREATE_CLIENT,
        _createProvider: CREATE_PROVIDER,
        _removeProvider: REMOVE_PROVIDER,
        _renameProvider: RENAME_PROVIDER,
      }),

      /**
       * Connect clients and providers management
       * actions to store
       */
      createNewClient ({ name, email, phone, providers }) {
        this.isComponentModalActive = false
        this.client = { name: '', email: '', phone: '', providers: [] }
        this._createClient({ name, email, phone, providers })
      },

      createProvider (name) {
        this._createProvider({ name })
      },

      removeProvider (id) {
        this._removeProvider(id)
      },

      renameProvider ({ id, name }) {
        this._renameProvider({ id, name })
      },
      /**
       * Fetch clients after closing modal (since providers may change)
       * and clean the form
       */
      closeModal () {
        this.isComponentModalActive = false
        this.client = { name: '', email: '', phone: '', providers: [] }
        this._fetchClients()
      }
    },

    data() {
      return {
        isComponentModalActive: false,
        client: { name: '', email: '', phone: '', providers: [] },
      }
    }
  }
</script>