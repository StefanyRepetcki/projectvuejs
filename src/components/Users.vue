<template>
  <div>
    <Toolbar class="p-mb-4">
      <template #left>
        <Button
          label="New"
          icon="pi pi-plus"
          class="p-button-success p-mr-2"
          @click="openNew"
        />
      </template>
    </Toolbar>
    <DataTable
      :v-model="usersSelected"
      ref="dt"
      :value="users"
      responsiveLayout="scroll"
      :filters="filters"
      :rows="10"
      filterDisplay="menu"
      dataKey="id"
      :paginator="true"
      currentPageReportTemplate="Mostrando {first} de {last} para {totalRecords} usuários"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
    >
      <template #header>
        <div class="table-header">
          <h5 class="p-m-0">Usuários</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global']" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="cpf" header="Cpf"></Column>
      <Column :exportable="false"
        ><template #body="users">
          <Button
            label="Edit"
            @click="editUsers(users.data.id)"
            icon="pi pi-pencil"
            class="p-button-help"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="confirmDeleteSelected(users.data.id)"
          /> </template
      ></Column>
    </DataTable>
    <Dialog
      :visible="deleteUsersDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to delete the selected products?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteUsersDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedUsers(users.data.id)"
        />
      </template>
    </Dialog>
    <FormUser
      v-if="usersDialog"
      :usersDialog="usersDialog"
      :edit="edit"
      :propUser="user"
    ></FormUser>
    <FormUser
      v-if="usersDialogEdit"
      :usersDialog="usersDialogEdit"
      :edit="edit"
      :propUser="user"
    ></FormUser>
  </div>
</template>

<script>
import UsersService from '../service/UsersService';
import FormUser from './FormUser';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';

export default {
  name: 'Users',
  props: {
    propUser: Object
  },
  components: {
    DataTable,
    Column,
    InputText,
    Button,
    Toolbar,
    Dialog,
    FormUser
  },
  data() {
    return {
      filters: {},
      deleteUsersDialog: false,
      usersDialogEdit: false,
      edit: false,
      usersSelected: null,
      usersDialog: false,
      users: null,
      sexo: null,
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
        complement: null,
        deleteThis: null
      }
    };
  },
  watch: {
    propUser: function(newProp) {
      this.usersProp(newProp);
    }
  },
  methods: {
    getUserforEdit(id) {
      const editUser = new UsersService();
      editUser
        .getUser(id)
        .then((response) => {
          this.user = response.data;
          console.log('SUCCESS');
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    editUsers(id) {
      this.edit = true;
      this.usersDialogEdit = true;
      this.getUserforEdit(id);
    },
    usersProp(newUser) {
      this.users = newUser;
    },
    confirmDeleteSelected(id) {
      this.deleteUsersDialog = true;
      this.deleteThis = id;
    },
    openNew() {
      this.usersDialog = true;
    },
    deleteSelectedUsers() {
      const id = this.deleteThis;
      this.serviceDeletUsers(id);
      this.removeinTable(id);
    },
    serviceDeletUsers(id) {
      const deletUsers = new UsersService();
      deletUsers
        .deletUsers(id)
        .then(() => {
          console.log('SUCCESS');
          this.removeinTable();
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    removeinTable(id) {
      this.usersArray(id);
      this.usersSelected = null;
      this.deleteUsersDialog = false;
    },
    usersArray(id) {
      const splice = this.spliceUsers();
      this.users.map(function(i, index) {
        return i.id === id ? splice(index) : '';
      });
    },
    spliceUsers(index) {
      this.users.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.card {
  width: 340px;
  height: 340px;
  background-color: azure;
}
.h1 {
  color: pink;
  font-weight: 600;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
