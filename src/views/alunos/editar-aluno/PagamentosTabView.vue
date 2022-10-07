<template>
  <b-form>
    <b-row>
      <b-col
        v-for="socialField in socialInputs"
        :key="socialField.dataField"
        cols="12"
        md="6"
        lg="4"
      >
        <b-form-group
          :label="socialField.label"
          :label-for="socialField.dataField"
        >
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon
                size="16"
                icon="TwitterIcon"
              />
            </b-input-group-prepend>
            <b-form-input
              id="FacebookIcon"
              v-model="userDataSocial[socialField.dataField]"
              type="url"
            />
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col class="mt-2">
        <b-button
          variant="primary"
          class="mb-1 mb-sm-0 mr-0 mr-sm-1"
          :block="$store.getters['app/currentBreakPoint'] === 'xs'"
        >
          Save Changes
        </b-button>
        <b-button
          variant="outline-secondary"
          :block="$store.getters['app/currentBreakPoint'] === 'xs'"
        >
          Reset
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BInputGroup,
  BInputGroupPrepend,

} from 'bootstrap-vue'

import router from '@/router'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BInputGroup,
    BInputGroupPrepend,

  },
  setup() {
    const userDataSocial = {
      twitter: ' ',
      facebook: '',
      instagram: '',
      github: '',
      codepen: '',
      slack: '',
    }
    // const userDataRedes = {
    //   twitter: 'userData[0].twitter_empresa'
    // }

    // ? dataField is field name of `userDataSocial` object
    const socialInputs = [
      {
        icon: 'TwitterIcon',
        dataField: 'twitter',
        label: 'Twitter',
      },
      {
        icon: 'FacebookIcon',
        dataField: 'facebook',
        label: 'facebook',
      },
      {
        icon: 'InstagramIcon',
        dataField: 'instagram',
        label: 'instagram',
      },
      {
        icon: 'GithubIcon',
        dataField: 'github',
        label: 'github',
      },
      {
        icon: 'CodepenIcon',
        dataField: 'codepen',
        label: 'codepen',
      },
      {
        icon: 'SlackIcon',
        dataField: 'slack',
        label: 'slack',
      },
    ]

    return {
      userDataSocial,
      socialInputs,
      // userDataRedes,
    }
  },

  data() {
    return {
      userData: {},
    }
  },

  created() {
    this.$http.get(`perfis/${router.currentRoute.params.id}`)
      .then(response => { this.userData = response.data.data })
      // .catch(error => {
    // if (error.response.status === 404) {
    //   userData.value = undefined
    // }
      // })
  },
}
</script>

<style>

</style>
