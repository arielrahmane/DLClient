<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
      </f7-nav-left>
      <div class="title">Configuración</div>
    </f7-navbar>

    <f7-list no-hairlines-md>
      <f7-list-input
        :value="amountOfNodes"
        @input="amountOfNodes = $event.target.value"
        outline
        label="Cantidad de Nodos"
        floating-label
        type="text"
        placeholder="Cantidad de Nodos"
        clear-button
      >
        <!--f7-icon fa="share-alt" slot="media"></f7-icon-->
      </f7-list-input>
      <f7-list-input
        :value="sensorSamplingFreq"
        @input="sensorSamplingFreq = $event.target.value"
        outline
        label="Período de muestreo (en segundos)"
        floating-label
        type="text"
        resizable
        placeholder="Período de muestreo (en segundos)"
        clear-button
      >
        <!--f7-icon fa="wave-square" slot="media"></f7-icon-->
      </f7-list-input>
    </f7-list>

    <f7-block>
      <f7-button large raised fill @click="updateSettings()">Guardar</f7-button>
    </f7-block>

  </f7-page>
</template>

<script>
  import { f7Page, f7Navbar, f7NavLeft, f7Link, f7BlockTitle, f7Block, f7List, f7ListInput, f7ListItem, f7Icon, 
          f7Button, f7Gauge, f7Row, f7Col, f7Swiper, f7SwiperSlide } from 'framework7-vue';
  import {get, put} from '../helpers/api';
  import {getSelectedNode} from '../helpers/globalVar';
  import testChart from '../components/charts/test';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7NavLeft,
      f7Link,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListInput,
      f7ListItem,
      f7Icon,
      f7Button,
      f7Gauge,
      f7Row, 
      f7Col,
      f7Swiper, 
      f7SwiperSlide,
      testChart
    },
    data () {
      return {
        amountOfNodes: 0,
        sensorSamplingFreq: 0
      }
    },
    beforeMount () {

    },
    mounted () {
        this.getSettings();
    },
    created () {
      console.log("Settings created");
    },
    breforeDestroy () {
      console.log("Settings destroyed");
    },
    computed: {

    },
    methods: {
      getSettings: function() {
        get(
          "settings", 
          response => {
            this.amountOfNodes = response.data.amountOfNodes;
            this.sensorSamplingFreq = response.data.sensorSamplingFreq;
          },
          error => {

          }
        )
      },
      updateSettings: function() {
        const self = this;
        var nodes = parseFloat(this.amountOfNodes);
        var freq = parseFloat(this.sensorSamplingFreq);
        self.$f7.dialog.preloader('Buscando nodos activos');
        put(
          "settings", 
          response => {
            self.$f7.dialog.close();
            self.$f7.dialog.alert(response.data, 'Hecho');
          },
          error => {
            self.$f7.dialog.close();
            self.$f7.dialog.alert('Entrada inválida', 'Error');
          },
          {
            amountOfNodes: nodes,
            sensorSamplingFreq: freq
          }
        )
      }
    }
  };
</script>