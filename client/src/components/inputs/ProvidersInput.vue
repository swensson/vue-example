<template>
  <div class="providers-input">
    <div class="providers-input__top">
      <b-input v-model="nameToAdd"></b-input>
      <b-button @click="create" class="providers-input__add">
        Add Provider
      </b-button>
    </div>

    <div class="providers-input__bottom">
      <div  v-for="provider in providers" :key="provider._id">
        <div class="row" v-if="isEditing(provider._id)">
          <b-input v-model="editingValues[provider._id]"></b-input>
          <div class="row__controls">
            <b-button size="is-small" @click="commit(provider._id)">Save</b-button>
          </div>
        </div>

        <div class="row" v-if="!isEditing(provider._id)">
          <b-checkbox :value="isChecked(provider._id)" @input="toggle(provider._id)">{{provider.name}}</b-checkbox>
          <div class="row__controls">
            <b-button size="is-small" @click="edit(provider._id)">Edit</b-button>
            <b-button size="is-small" @click="remove(provider._id)">Remove</b-button>
          </div>
        </div>
      </div>
      <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: [
      'providers', 'value', 'loading'
    ],

    data () {
      return {
        nameToAdd: '',
        editing: [],
        editingValues: {}
      }
    },

    methods: {
      isChecked (id) {
        return this.value.includes(id)
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

      create () {
        this.$emit('create', this.nameToAdd)
      },

      remove (id) {
        this.$emit('remove', id)
      },

      /* Edit stuff */
      edit (id) {
        this.editing.push(id)
        this.editingValues[id] = this.providers.filter(({ _id }) => _id === id).pop().name
      },

      isEditing (id) {
        return this.editing.includes(id)
      },

      commit (id) {
        const index = _.findIndex(this.editing, id)
        const name = this.editingValues[id]

        this.editing.splice(index, 1)
        this.$emit('rename', { id, name })
      }
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
