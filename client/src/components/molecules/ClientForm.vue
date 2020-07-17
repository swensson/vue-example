<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{title}}</p>
    </header>

    <section class="modal-card-body">
      <b-field label="Name" :type="getType('name')" :message="getMessage('name')">
        <b-input
          type="text"
          v-model="client.name"
          placeholder="Name"
          required>
        </b-input>
      </b-field>

      <b-field label="Email" :type="getType('email')" :message="getMessage('email')">
        <b-input
          type="email"
          v-model="client.email"
          placeholder="Email"
          required>
        </b-input>
      </b-field>

      <b-field label="Phone" :type="getType('phone')" :message="getMessage('phone')">
        <b-input
          type="text"
          v-model="client.phone"
          password-reveal
          placeholder="Phone"
          required>
        </b-input>
      </b-field>

      <b-field label="Providers" :type="getType('providers')" :message="getMessage('providers')">
        <providers-input
          :providers="providers.value"
          :loading="providers.loading"
          v-model="client.providers"
          @create="createProvider"
          @remove="removeProvider"
          @rename="renameProvider"
        >
        </providers-input>
      </b-field>
    </section>

    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">Close</button>
      <button class="button is-primary" @click="submit">{{buttonLabel}}</button>
    </footer>
  </div>
</template>

<script>
  import ProvidersInput from '@/components/inputs/ProvidersInput'

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  export default {
    components: {
      ProvidersInput
    },

    data () {
      return {
        validation: {
          email: null,
          phone: null,
          name: null,
        },
      }
    },

    props: [
      'title', 'providers', 'client', 'buttonLabel'
    ],

    methods: {
      createProvider (data) {
        this.$emit('createProvider', data)
      },
      removeProvider (data) {
        this.$emit('removeProvider', data)
      },
      renameProvider (data) {
        this.$emit('renameProvider', data)
      },

      /* Validation stuff */
      getType (field) {
        return !!this.validation[field] ? 'is-danger' : null
      },
      getMessage (field) {
        return this.validation[field] || null
      },

      validate () {
        this.validation.name =
          (!this.client.name && 'This field is required') || (this.client.name.length < 5 && 'Too short')
        this.validation.email =
          (!this.client.email && 'This field is required') || (!EMAIL_REGEX.test(this.client.email) && 'Incorrect email')
        this.validation.phone =
          (!this.client.phone && 'This field is required') || (this.client.phone.length < 5 && 'Too short')

        return Object.values(this.validation).filter((v) => !!v).length === 0
      },

      submit () {
        if (this.validate()) {
          this.$emit('submit', this.client)
        }
      },
    },
  }
</script>

