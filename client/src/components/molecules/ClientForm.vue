<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{title}}</p>
    </header>

    <section class="modal-card-body">
      <b-field label="Name" :type="getType('name')" :message="getMessage('name')">
        <b-input
          required
          type="text"
          placeholder="Name"
          v-model="client.name"
        >
        </b-input>
      </b-field>

      <b-field label="Email" :type="getType('email')" :message="getMessage('email')">
        <b-input
          required
          type="email"
          placeholder="Email"
          v-model="client.email"
        >
        </b-input>
      </b-field>

      <b-field label="Phone" :type="getType('phone')" :message="getMessage('phone')">
        <b-input
          required
          type="text"
          password-reveal
          placeholder="Phone"
          v-model="client.phone"
        >
        </b-input>
      </b-field>

      <b-field label="Providers" :type="getType('providers')" :message="getMessage('providers')">
        <providers-input
          v-model="client.providers"
          :providers="providers.value"
          :loading="providers.loading"
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
  /**
   * A Form component (uses inputs and does validation) for Cleint.
   * Can be used to create and edit as well.
   */
  import ProvidersInput from '@/components/inputs/ProvidersInput'
  import api from '@/libs/api'

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const PHONE_REGEX = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i

  export default {
    components: {
      ProvidersInput
    },

    data () {
      return {
        validation: { email: null, phone: null, name: null },
      }
    },

    props: [
      'title', 'providers', 'client', 'buttonLabel', 'id'
    ],

    methods: {
      /**
       * Provider management methods (create, rename, remove)
       */
      createProvider (data) {
        this.$emit('createProvider', data)
      },
      renameProvider (data) {
        this.$emit('renameProvider', data)
      },
      removeProvider (data) {
        this.$emit('removeProvider', data)
      },

      /**
       * b-field validation integration methods
       */
      getType (field) {
        return !!this.validation[field] ? 'is-danger' : null
      },

      getMessage (field) {
        return this.validation[field] || null
      },

      /**
       * Form validation code
       */
      async validate () {
        this.validation = {
          /* Name should be presented and not be less than 6 chars */
          name:
            (!this.client.name && 'This field is required')
            || (this.client.name.length < 5 && 'Too short'),
          /* Email should be an email and be not in use */
          email:
            (!this.client.email && 'This field is required')
            || (!EMAIL_REGEX.test(this.client.email) && 'Incorrect email')
            || ((await api.emailBusy(this.client.email, this.id)) && 'Email in use'),
          /* Phone should be not empty and valid phone TODO */
          phone:
            (!this.client.phone && 'This field is required')
            || (!PHONE_REGEX.test(this.client.phone) && 'Incorrect phone')
            || (this.client.phone.length < 5 && 'Too short')
        }

        /* Return true/false depending on validation status */
        return Object.values(this.validation).filter((v) => !!v).length === 0
      },

      /**
       * Form submit method
       */
      async submit () {
        const valid = await this.validate()

        if (valid) {
          this.$emit('submit', this.client)
        }
      },
    },
  }
</script>

