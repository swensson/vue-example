<template>
  <div class="providers-input">
    <div class="providers-input__top">
      <b-input v-model="nameToAdd"></b-input>
      <b-button @click="addProvider" class="providers-input__add">
        Add Provider
      </b-button>
    </div>

    <div class="providers-input__bottom">
      <div class="row" v-for="provider in providers" :key="provider._id">
        <b-checkbox :value="isChecked(provider._id)" @input="toggle(provider._id)">{{provider.name}}</b-checkbox>
        <div class="row__controls">
          <b-button size="is-small">Edit</b-button>
          <b-button size="is-small" @click="remove(provider._id)">Remove</b-button>
        </div>
      </div>
      <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  /**
   * Accepts
   *   :providers - list of all providers accessible
   *   :loading - the loader
   *   :value - the list of IDs of chosen providers
   */
  export default {
    props: ['providers', 'value', 'loading'],

    data () {
      return {
        nameToAdd: ''
      }
    },

    methods: {
      isChecked (id) {
        return this.value.includes(id)
      },

      addProvider () {
        this.$emit('create', this.nameToAdd)
      },

      toggle (id) {
        const checked = this.isChecked(id)

        if (checked) {
          const index = _.findIndex(this.value, id)

          this.value.splice(index, 1)
        } else {
          this.value.push(id)
        }

        this.$emit('input', this.value)
      },

      remove (id) {
        this.$emit('remove', id)
      },
    },
  }
</script>

<style>
  .providers-input__top {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .providers-input__add {
    margin-left: 12px;
  }

  .providers-input__bottom {

  }

  .row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .row__controls {
    display: flex;
    align-items: center;
  }
</style>
