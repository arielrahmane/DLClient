<template>
  <f7-page>
    <f7-navbar large title="Data" title-large="Data" back-link="atrás"></f7-navbar>
    <f7-block-title>Nodo {{selectedNode.nodeID}}</f7-block-title>
    <f7-block strong>
      <f7-block-title>Data nodo {{selectedNode.nodeID}}</f7-block-title>
        <f7-list>
          <f7-list-item title="Temperatura" :after="print(nodeData.temp, '°C')"></f7-list-item>
          <f7-list-item title="Humedad" :after="print(nodeData.humid, '%')"></f7-list-item>
          <f7-list-item title="Concentración de alcohol" :after="nodeData.alcohol"></f7-list-item>
          <f7-list-item title="Fecha" :after="nodeData.date"></f7-list-item>
          <f7-list-item title="Hora" :after="nodeData.time"></f7-list-item>
        </f7-list>
    </f7-block>
    
  </f7-page>
</template>

<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7List, f7ListItem, f7Icon } from 'framework7-vue';
  import {get} from '../helpers/api';
  import {getSelectedNode} from '../helpers/globalVar';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7Icon
    },
    data () {
      return {
        nodeData: {
          temp: 0.0,
          humid: 0.0,
          alcohol: 0.0,
          date: "",
          time: ""
        },
        selectedNode: {}
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
            this.nodeData.temp = response.data.temp;
            this.nodeData.humid = response.data.humid;
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