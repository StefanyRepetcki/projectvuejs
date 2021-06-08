import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

const app = new Vue({
  render: (h) => h(App)
}).$mount('#app');

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';

app.use(PrimeVue);

app.component('Calendar', Calendar);
app.component('Dialog', Dialog);
app.component('Checkbox', Checkbox);
app.component('Button', Button);
app.component('Toolbar', Toolbar);
app.component('FileUpload', FileUpload);
app.component('DataTable', DataTable);
app.component('InputText', InputText);
