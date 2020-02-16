<template>
  <modal
    title="Modal with form + Validate"
    @close="closeModal">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <!-- name -->
        <div class="form-item" :class="{errorInput: $v.name.$error}">
          <label>Name:</label>
          <p class="errorText" v-if="!$v.name.required">Field is required</p>
          <p class="errorText" v-if="!$v.name.minLength">Name must have at least {{ $v.name.$params.minLength.min }}!</p>
          <input
            v-model="name"
            :class="{error: $v.name.$error}"
            @blur="$v.name.$touch()">
        </div>
        <!-- password -->
        <div class="form-item" :class="{errorInput: $v.password.$error}">
          <label>Password:</label>
          <p class="errorText" v-if="!$v.password.required">Field is required</p>
          <p class="errorText" v-if="!$v.password.minLength">Name must have at least {{ $v.password.$params.minLength.min }}!</p>
          <input
            v-model="password"
            :class="{error: $v.password.$error}"
            @blur="$v.password.$touch()">
        </div>
        <!-- repeat password -->
        <div class="form-item" :class="{errorInput: $v.repeatPassword.$error}">
          <label>Repeat password:</label>
          <p class="errorText" v-if="!$v.repeatPassword.sameAsPassword">Passwords must be identical!</p>
          <input
            v-model="repeatPassword"
            :class="{error: $v.repeatPassword.$error}"
            @blur="$v.repeatPassword.$touch()">
        </div>
        <!-- email -->
        <div class="form-item" :class="{errorInput: $v.email.$error}">
          <label>Email:</label>
          <p class="errorText" v-if="!$v.email.required">Field is required</p>
          <p class="errorText" v-if="!$v.email.email">Email is not correct!</p>
          <input
            v-model="email"
            :class="{error: $v.email.$error}"
            @blur="$v.email.$touch()">
        </div>
        <!-- button -->
        <button class="btn btnPrimary">Submit!</button>
      </form>
    </div>
  </modal>

</template>

<script>
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
  import modal from '~/components/UI/Modal.vue'

  export default {
    components: {
      modal,
    },
    data() {
      return {
        email: '',
        name: '',
        password: '',
        repeatPassword: ''
      }
    },
    validations: {
      name: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(5)
      },
      repeatPassword: {
        sameAsPassword: sameAs('password')
      }
    },
    created() {
      let view = this.$store.getters.getModalView
      console.log(view)
    },
    methods: {
      onSubmit () {
        this.$v.$touch()
        if(!this.$v.$invalid){
          const user = {
            name: this.name,
            email: this.email,
            password: this.password
          }
          console.log(user)

          //done
          this.closeModal()
        }
      },
      closeModal () {
        //close
        this.$emit('close')

        //reset
        this.resetData()
      },
      resetData () {
        this.name = ''
        this.email = ''
        this.password = ''
        this.repeatPassword = ''
        this.$v.$reset()
      }
    }

  }
</script>

<style lang="scss">
  .form-item .errorText{
    display: none;
    margin-bottom: 8px;
    font-size: 13.4px;
    color: #de4040;
  }

  .form-item {
    &.errorInput .errorText{
      display: block;
    }
  }

  input.error {
    border-color: #de4040;
  }

</style>
