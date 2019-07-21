<template>
    <f7-page name="home">
        <f7-navbar>
            <f7-nav-left>
                <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
            </f7-nav-left>
            <div class="title">OpenDL</div>
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
            <f7-col><f7-button fill class="color-green" :disabled="deviceStarted" @click="startDevice(1)">Iniciar</f7-button></f7-col>
            <f7-col><f7-button fill class="color-red" :disabled="!deviceStarted" @click="stopDevice()">Parar</f7-button></f7-col>
          </f7-row>
          <p></p>
          <f7-row>
            <f7-col><f7-button fill class="color-blue" :disabled="!devicePaused" @click="restartDevice()">Renaudar</f7-button></f7-col>
            <f7-col><f7-button fill class="color-yellow" :disabled="devicePaused" @click="pauseDevice()">Pausar</f7-button></f7-col>
          </f7-row>
        </f7-block>
    </f7-page>
</template>

<script>
  import { f7Page, f7Block, f7Navbar, f7NavLeft, f7NavTitle, f7NavTitleLarge, f7NavRight, 
          f7BlockTitle, f7List, f7ListItem, f7Link, f7Searchbar, f7Icon, f7Row, f7Col, 
          f7Button, f7Segmented } from 'framework7-vue';
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
      f7Button,
      f7Segmented
    },
    data () {
      return {
        deviceStarted: false,
        devicePaused: false
      }
    },
    beforeMount () {

    },
    mounted () {
      this.askDeviceIfRunning();
      console.log("HomePage mounted");
    },
    created () {
      this.askDeviceIfRunning();
      console.log("HomePage created");
    },
    breforeDestroy () {
      console.log("HomePage destroyed");
    },
    computed: {

    },
    methods: {
      askDeviceIfRunning: function () {
        var self = this;
        self.$f7.dialog.preloader('Cargando');
        get(
          "device/isRunning", 
          response => {
            self.$f7.dialog.close();
            var isRunning = response.data;
            setDeviceStarted(isRunning);
            this.deviceStarted = getDeviceStarted();
          },
          error => {
            self.$f7.dialog.close();
            this.deviceStarted = getDeviceStarted();
            console.log("Error al hacer http request: ", error);
          }
        )
      },
      startDevice: function (mode) {
        const self = this;
        this.devicePaused = false;
        self.$f7.dialog.preloader('Buscando nodos activos');
        post(
            "device/start",
            response => {
              self.$f7.dialog.close();
              setDeviceStarted(true);
              self.$f7.dialog.alert('El DL ha comenzado a recopilar data', 'Terminado');
              this.deviceStarted = getDeviceStarted();
            },
            error => {
               self.$f7.dialog.close();
               self.$f7.dialog.alert('No se ha podido iniciar el DL', 'Error');
            },
            {
              value: mode
            }
          )
      },
      stopDevice: function () {
        const self = this;
        this.devicePaused = false;
        post(
            "device/stop",
            response => {
              setDeviceStarted(false);
              this.deviceStarted = getDeviceStarted();
              self.$f7.dialog.alert('La recopilación de data se encuentra en pausa', 'Pausa');
            },
            error => {
               self.$f7.dialog.alert(error.data.message, 'Error');
            }
          )
      },
      pauseDevice: function () {
        // Make pause device request
        this.devicePaused = true;
      },
      restartDevice: function() {
        //Make restart device request
        this.devicePaused = false;
      }
    }
  };
</script>
