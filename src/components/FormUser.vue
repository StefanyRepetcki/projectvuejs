<template>
  <div>
    <Dialog
      :visible="dialog"
      :style="{ width: '1000px' }"
      header="Cadastro do usuário"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col-12">
          <label for="avatar">Avatar</label>
          <Avatar id="avatar" v-model="user.avatar" icon="pi pi-search" />
        </div>
        <div class="p-field p-col-12 p-md-6">
          <label for="firstname">Nome</label>
          <InputText id="firstname" v-model="user.name" type="text" />
        </div>
        <div class="p-field p-col-12 p-md-6">
          <label for="lastname">Sobrenome</label>
          <InputText id="lastname" v-model="user.lastname" type="text" />
        </div>
        <div class="p-field p-col-12 p-md-6">
          <label for="cpf">CPF</label>
          <InputText id="cpf" v-model="user.cpf" type="text" />
        </div>
        <div class="p-field p-col-12 p-md-6">
          <label for="sexo">Sexo</label>
          <RadioButton name="sexo" value="true" v-model="user.sexo" />
          <RadioButton name="sexo" value="false" v-model="user.sexo" />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <div class="p-float-label">
            <Calendar
              id="birthdate"
              v-model="user.birthdate"
              :showIcon="true"
            />
            <label for="birthdate">Aniversário</label>
          </div>
        </div>
        <div class="p-field p-col-12">
          <label for="email">E-mail</label>
          <InputText id="email" v-model="user.email" type="text" />
        </div>
        <div class="p-field p-col-12 p-md-6">
          <label for="cellphone">Telefone</label>
          <InputText id="cellphone" v-model="user.cellphone" type="text" />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <label for="cep">CEP</label>
          <InputText id="cep" v-model="user.cep" type="text" />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <label for="street">Rua</label>
          <InputText id="street" v-model="street" type="text" />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <label for="numberstreet">N°</label>
          <InputText id="numberstreet" v-model="numberstreet" type="text" />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <label for="state">Estado</label>
          <Dropdown
            inputId="state"
            v-model="state"
            :options="states"
            optionLabel="name"
            placeholder="Select"
          />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <label for="city">Cidade</label>
          <Dropdown
            inputId="city"
            v-model="city"
            :options="citys"
            optionLabel="name"
            placeholder="Select"
          />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <label for="district">Bairro</label>
          <Dropdown
            inputId="district"
            v-model="district"
            :options="states"
            optionLabel="name"
            placeholder="Select"
          />
        </div>
        <div class="p-field p-col-12 p-md-6">
          <label for="complement">Complemento</label>
          <InputText id="complement" type="text" />
        </div>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="dialog = false"
        />
        <Button
          v-if="!edit"
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="addNewUser()"
        />
      </template>
    </Dialog>
  </div>
</template>
<script>
//@ts-ignore
import UsersService from '../service/UsersService';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Avatar from 'primevue/avatar';
import RadioButton from 'primevue/radiobutton';

export default {
  name: 'FormUser',
  props: {
    usersDialog: Boolean,
    edit: Boolean,
    propUser: Object
  },
  components: {
    InputText,
    Button,
    Dialog,
    Dropdown,
    Calendar,
    Avatar,
    RadioButton
  },
  data() {
    return {
      dialog: false,
      user: {
        avatar: null,
        name: null,
        lastname: null,
        cpf: null,
        sexo: false,
        birthdate: null,
        email: null,
        cellphone: null,
        cep: null,
        street: null,
        numberstreet: null,
        state: null,
        city: null,
        district: null,
        complement: null
      }
    };
  },
  mounted() {
    this.usersProp();
    this.usersDialogProp();
  },
  methods: {
    addNewUser() {
      const addUser = new UsersService();
      addUser
        .addUsers(this.user)
        .then(() => {
          console.log('SUCCESS');
        })
        .catch(function(e) {
          console.log(e);
        });
      this.dialog = false;
    },
    usersProp() {
      this.users = this.usersProp;
    },
    usersDialogProp() {
      this.dialog = this.usersDialog;
    },
    openNew() {
      this.dialog = true;
    }
  }
};
</script>
