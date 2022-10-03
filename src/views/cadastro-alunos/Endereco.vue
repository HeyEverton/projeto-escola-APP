<template>
  <div>
    <tab-content
      title="Endereço"
      :before-change="validationFormInfo"
    >
      <validation-observer
        ref="infoRules"
        tag="form"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Personal Info
            </h5>
            <small class="text-muted">Enter Your Personal Info.</small>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="First Name"
              label-for="first-name"
            >
              <validation-provider
                #default="{ errors }"
                name="First Name"
                rules="required"
              >
                <b-form-input
                  id="first-name"
                  v-model="first_name"
                  placeholder="John"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Last Name"
              label-for="last-name"
            >
              <validation-provider
                #default="{ errors }"
                name="Last Name"
                rules="required"
              >
                <b-form-input
                  id="last-name"
                  v-model="last_name"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Doe"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="Country"
              rules="required"
            >
              <b-form-group
                label="Country"
                label-for="country"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="country"
                  v-model="selectedContry"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="countryName"
                  :selectable="option => ! option.value.includes('select_value')"
                  label="text"
                />
                <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="Language"
              rules="required"
            >
              <b-form-group
                label="Language"
                label-for="language"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  id="language"
                  v-model="selectedLanguage"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="languageName"
                  :selectable="option => ! option.value.includes('nothing_selected')"
                  label="text"
                />
                <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
      </validation-observer>
    </tab-content>
  </div>
</template>
<script>
export default {

}
</script>
