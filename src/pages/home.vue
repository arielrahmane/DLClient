<template>
    <f7-page name="home" @page:beforeremove="onPageBeforeRemove" @page:beforeout="onPageBeforeOut">
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
        <f7-block-title>OpenDL</f7-block-title>
        <f7-block inner>
            <p>OpenDL</p>
        </f7-block>
        <f7-block>
          <f7-row>
            <f7-col><f7-button fill class="color-green" :disabled="deviceStarted" @click="startDevice(1)">Iniciar</f7-button></f7-col>
            <f7-col><f7-button fill class="color-red" :disabled="!deviceStarted" @click="stopDevice()">Parar</f7-button></f7-col>
          </f7-row>
          <p></p>
        </f7-block>
        <f7-block inner>
            <f7-button fill sheet-open=".demo-sheet-swipe-to-close" round class="color-blue">Exportar data</f7-button>
        </f7-block>

        <f7-sheet
          position="bottom"
          class="demo-sheet-swipe-to-close"
          style="height:auto; --f7-sheet-bg-color: #fff;"
          swipe-to-close
          backdrop
        >
          <f7-page-content>
            <f7-list no-hairlines-md>
              <f7-list-input
                label="Nodo"
                type="select"
                placeholder="Seleccionar Nodo"
                required
                clear-button
                :value="nodeSelection"
                @input="nodeSelection = $event.target.value"
              >
                <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
                <option value=0>Nodo 0</option>
                <option value=1>Nodo 1</option>
                <option value=2>Nodo 2</option>
                <option value=3>Nodo 3</option>
                <option value=4>Nodo 4</option>
                <option value=5>Nodo 5</option>
                <option value=6>Nodo 6</option>
                <option value=7>Nodo 7</option>
                <option value=8>Nodo 8</option>
                <option value=9>Nodo 9</option>
                <option value=10>Nodo 10</option>
                <option value=11>Nodo 11</option>
                <option value=12>Nodo 12</option>
                <option value=13>Nodo 13</option>
                <option value=14>Nodo 14</option>
                <option value=15>Nodo 15</option>
              </f7-list-input>
              <f7-list-input
                label="E-mail"
                type="email"
                placeholder="E-mail de destino"
                required
                validate
                clear-button
                :value="emailDestination"
                @input="emailDestination = $event.target.value"
              >
                <f7-icon icon="demo-list-icon" slot="media"></f7-icon>
              </f7-list-input>
            </f7-list>
            <f7-button fill round class="color-blue" @click="exportNode()">Enviar</f7-button>
            
            <f7-block>
              <p> </p>
            </f7-block>
          </f7-page-content>
        </f7-sheet>
    </f7-page>
</template>

<script>
  import { f7Page, f7Block, f7Navbar, f7NavLeft, f7NavTitle, f7NavTitleLarge, f7NavRight, 
          f7BlockTitle, f7List, f7ListItem, f7Link, f7Searchbar, f7Icon, f7Row, f7Col, 
          f7Button, f7Segmented, f7Sheet, f7PageContent, f7ListInput, f7Fab, f7FabButtons, f7FabButton } from 'framework7-vue';
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
      f7Segmented,
      f7Sheet,
      f7PageContent,
      f7ListInput,
      f7Fab,
      f7FabButtons,
      f7FabButton
    },
    data () {
      return {
        deviceStarted: false,
        devicePaused: false,
        emailDestination: "",
        nodeSelection: 0
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
        self.$f7.dialog.preloader('Deteniendo dispositivo');
        post(
            "device/stop",
            response => {
              self.$f7.dialog.close();
              setDeviceStarted(false);
              this.deviceStarted = getDeviceStarted();
              self.$f7.dialog.alert('La recopilación de data se encuentra en pausa', 'Pausa');
            },
            error => {
              self.$f7.dialog.close();
              self.$f7.dialog.alert(error.data.message, 'Error');
            }
          )
      },
      pauseDevice: function () {
        // Make pause device request
        this.stopDevice();
        this.devicePaused = true;
      },
      restartDevice: function() {
        //Make restart device request
        this.startDevice(3);
        this.devicePaused = false;
      },
      exportData: function() {
        var self = this;
        console.log('Exporting data via email');
        if (this.emailDestination !== "") {
          post(
            "emailData",
            response => {
              self.$f7.dialog.alert('En breve el email será enviado a su destinatario', 'Listo');
            },
            error => {
              self.$f7.dialog.alert(error.data.message, 'Error');
            },
            {
              to: this.emailDestination
            }
          )
        } else {
          self.$f7.dialog.alert("Por favor, ingrese una dirección de mail válida", 'Error');
        }
        
      },
      exportNode: function() {
        var self = this;
        console.log('Exporting Node data via email');
        if (this.emailDestination !== "") {
          self.$f7.dialog.alert('En breve el email será enviado a su destinatario', 'Listo');
          post(
            "emailNode",
            response => {
              self.$f7.dialog.alert('Se envió el archivo adjunto', 'Enviado');
            },
            error => {
              self.$f7.dialog.alert(error.data.message, 'Error');
            },
            {
              to: this.emailDestination,
              node: this.nodeSelection
            }
          )
        } else {
          self.$f7.dialog.alert("Por favor, ingrese una dirección de mail válida", 'Error');
        }
        
      },
      onPageBeforeOut() {
        const self = this;
        // Close opened sheets on page out
        self.$f7.sheet.close();
      },
      onPageBeforeRemove() {
        const self = this;
        // Destroy sheet modal when page removed
        if (self.sheet) self.sheet.destroy();
      }
    }
  };
</script>
