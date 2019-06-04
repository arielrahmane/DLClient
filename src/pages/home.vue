<template>
    <f7-page name="home">
        <f7-navbar>
            <f7-nav-left>
                <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
            </f7-nav-left>
            <div class="title">Ariel DL</div>
            <f7-nav-right>
                <f7-link class="searchbar-enable" data-searchbar=".searchbar-components" icon="fas fa-search"></f7-link>
            </f7-nav-right>
            <f7-searchbar class="searchbar-components" search-container=".components-list" search-in="a" expandable></f7-searchbar>
        </f7-navbar>
        <f7-block-title>Bienvenido a Data Logger</f7-block-title>
        <f7-block inner>
            <p>Este es un Data Logger.</p>
        </f7-block>
        <f7-block>
          <f7-row>
            <f7-col>
              <f7-button fill>Button</f7-button>
            </f7-col>
            <f7-col>
              <f7-button fill v-if="!deviceStarted" @click="startDevice()">Iniciar</f7-button>
              <f7-button fill v-if="deviceStarted" @click="stopDevice()">Pausar</f7-button>
            </f7-col>
            <f7-col>
              <f7-button fill round>Round</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>
    </f7-page>
</template>

<script>
  import { f7Page, f7Block, f7Navbar, f7NavLeft, f7NavTitle, f7NavTitleLarge, f7NavRight, f7BlockTitle, f7List, f7ListItem, f7Link, f7Searchbar, f7Icon, f7Row, f7Col, f7Button } from 'framework7-vue';
  import {get, post} from '../helpers/api';
  import {setDeviceStarted, getDeviceStarted} from '../helpers/globalVar';
  export default {
    name: "HomePage",
    components: {
      f7Page,
      f7Navbar,
      f7NavLeft,
      f7NavTitle,
      f7NavTitleLarge,
      f7NavRight,
      f7BlockTitle,
      f7List,
      f7ListItem,
      f7Link,
      f7Searchbar,
      f7Icon,
      f7Block, 
      f7Row, 
      f7Col, 
      f7Button
    },
    data () {
      return {
        deviceStarted: false
      }
    },
    beforeMount () {

    },
    mounted () {
      this.deviceStarted = getDeviceStarted();
      console.log("HomePage mounted");
    },
    created () {
      this.deviceStarted = getDeviceStarted();
      console.log("HomePage created");
    },
    breforeDestroy () {
      console.log("HomePage destroyed");
    },
    computed: {

    },
    methods: {
      getTest: function () {
        get(
          "", 
          response => {
            console.log(response.data);
            this.title = response.data.title;
            this.description = response.data.description;
          },
          error => {
            console.log("Error al hacer http request: ", error);
          }
        )
      },
      startDevice: function () {
        const self = this;
        self.$f7.dialog.preloader('Buscando nodos activos');
        setDeviceStarted(true);
        this.deviceStarted = getDeviceStarted();
        post(
            "",
            response => {
              self.$f7.dialog.close();
              self.$f7.dialog.alert('El DL ha comenzado a recopilar data', 'Terminado');
            },
            error => {
               self.$f7.dialog.close();
               self.$f7.dialog.alert('No se ha podido iniciar el DL', 'Error');
            },
            {
              value: 1
            }
          )
      },
      stopDevice: function () {
        const self = this;
        setDeviceStarted(false);
        this.deviceStarted = getDeviceStarted();
        post(
            "",
            response => {
              self.$f7.dialog.alert('La recopilación de data se encuentra en pausa', 'Pausa');
            },
            error => {
              // that.$f7.hidePreloader();
            },
            {
              value: 4
            }
          )
      }
    }
  };
</script>
