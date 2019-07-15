<template>
  <f7-page>
    <f7-navbar large title="Data" title-large="Data" back-link="atrás"></f7-navbar>
    <f7-block-title>Nodo {{selectedNode.nodeID}}</f7-block-title>
    <f7-block strong>
      <f7-block-title>Data nodo {{selectedNode.nodeID}}</f7-block-title>
        <f7-list>
          <f7-list-item title="Temperatura" :after="print(nodeData.tempA, '°C')"></f7-list-item>
          <f7-list-item title="Humedad" :after="print(nodeData.humidA, '%')"></f7-list-item>
          <f7-list-item title="Concentración de alcohol" :after="nodeData.alcohol"></f7-list-item>
          <f7-list-item title="Fecha" :after="nodeData.date"></f7-list-item>
          <f7-list-item title="Hora" :after="nodeData.time"></f7-list-item>
        </f7-list>
    </f7-block>
    <f7-block>
      <f7-button @click="$f7router.navigate('/nodes/node/history')">Ver Historial</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7List, f7ListItem, f7Icon, f7Button } from 'framework7-vue';
  import {get} from '../helpers/api';
  import {getSelectedNode} from '../helpers/globalVar';
  import testChart from '../components/charts/test';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7Icon,
      f7Button,
      testChart
    },
    data () {
      return {
        nodeData: {
          tempA: 0.0,
          tempB: 0.0,
          tempC: 0.0,
          humidA: 0.0,
          humidB: 0.0,
          humidC: 0.0,
          alcohol: 0.0,
          date: "",
          time: ""
        },
        selectedNode: {},
        datacollection: null,
        testData: []
      }
    },
    beforeMount () {

    },
    mounted () {
      this.selectedNode = getSelectedNode();
      this.getLatestData(this.selectedNode.nodeID);
      console.log("Node data mounted");
    },
    created () {
      console.log("Node data created");
    },
    breforeDestroy () {
      console.log("Node data destroyed");
    },
    computed: {

    },
    methods: {
      getLatestData: function (node) {
        var source = "nodes/" + String(node);
        get(
          source, 
          response => {
            this.nodeData.tempA = response.data.tempA;
            this.nodeData.tempB = response.data.tempB;
            this.nodeData.tempC = response.data.tempC;
            this.nodeData.humidA = response.data.humidA;
            this.nodeData.humidB = response.data.humidB;
            this.nodeData.humidC = response.data.humidC;
            this.nodeData.alcohol = response.data.alcohol;
            var createdAt = response.data.createdAt;
            this.nodeData.date = createdAt.slice(0, 10);
            this.nodeData.time = createdAt.slice(11, 19);
          },
          error => {
            console.log("Error al hacer http request: ", error);
          }
        )
      },
      print: function(value, text) {
        return String(value) + text;
      },
      isActive: function(value) {
        if (value) return "Activo";
        else return "Inactivo";
      }
    }
  };
</script>