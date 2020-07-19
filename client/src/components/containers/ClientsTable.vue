<template>
  <div>
    <b-table :data="clients.value" :loading="clients.loading">
      <template slot-scope="props">
        <b-table-column field="name" label="Name">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="email" label="Email">
          {{ props.row.email }}
        </b-table-column>

        <b-table-column field="phone" label="Phone" >
          {{ props.row.phone }}
        </b-table-column>

        <b-table-column field="providers" label="Providers" >
          {{ getProvidersLabel(props.row.providers) }}
        </b-table-column>

        <b-table-column field="actions" label="Actions" >
          <b-button @click="edit(props.row._id)">Edit</b-button>
          <b-button @click="remove(props.row._id)">Delete</b-button>
        </b-table-column>
      </template>

      <template slot="empty">
        <span>Create a client to start</span>
      </template>
    </b-table>

    <b-modal
      v-if="editModalVisible"
      aria-modal
      trap-focus
      has-modal-card
      @close="closeModal"
      aria-role="dialog"
      :active.sync="editModalVisible"
      :destroy-on-hide="false"
    >
      <client-form
        title="Edit Client"
        buttonLabel="Save"
        :client="client"
        :providers="providers"
        :id="id"
        @submit="updateClient"
        @close="closeModal"
        @createProvider="createProvider"
        @removeProvider="removeProvider"
        @renameProvider="renameProvider"
      ></client-form>
    </b-modal>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapActions, mapGetters } from 'vuex'
  import { FETCH_CLIENTS, FETCH_PROVIDERS, GET_CLIENTS, GET_PROVIDERS, UPDATE_CLIENT, REMOVE_CLIENT, CREATE_PROVIDER, REMOVE_PROVIDER, RENAME_PROVIDER } from '@/store/modules/clients'
  import ClientForm from '@/components/molecules/ClientForm'

  export default {
    components: { ClientForm },
    created() {
      this._fetchClients()
      this._fetchProviders()
    },

    methods: {
      ...mapActions({
        _fetchClients: FETCH_CLIENTS,
        _fetchProviders: FETCH_PROVIDERS,
        _removeClient: REMOVE_CLIENT,
        _updateClient: UPDATE_CLIENT,
        _createProvider: CREATE_PROVIDER,
        _removeProvider: REMOVE_PROVIDER,
        _renameProvider: RENAME_PROVIDER,
      }),
      getProvidersLabel (providers) {
        return providers.map(({ name }) => name).join(', ')
      },
      remove (id) {
        this._removeClient(id)
      },
      edit (id) {
        const client = _.find(this.clients.value, ({ _id }) => _id === id)

        this.id = id
        this.client.name = client.name
        this.client.phone = client.phone
        this.client.email = client.email

        while (this.client.providers.length) {
          this.client.providers.pop()
        }

        client.providers.forEach(({ _id }) => {
          this.client.providers.push(_id)
        })

        this.editModalVisible = true
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
      updateClient (body) {
        this._updateClient({ id: this.id, body })
        this.editModalVisible = false
      },
      closeModal () {
        this._fetchClients()
        this.editModalVisible = false
      },
    },

    computed: {
      ...mapGetters({
        clients: GET_CLIENTS,
        providers: GET_PROVIDERS
      }),
    },

    data() {
      return {
        editModalVisible: false,
        id: null,
        client: {
          name: '', phone: '', email: '', providers: []
        }
      }
    }
  }
</script>
