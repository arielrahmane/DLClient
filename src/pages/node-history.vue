<template>
  <f7-page>

    <f7-navbar>
      <f7-nav-left back-link="atrás"></f7-nav-left>
      <div class="title">Historial Nodo {{selectedNode.nodeID}}</div>
    </f7-navbar>

    <f7-sheet
      class="demo-sheet-swipe-to-close"
      style="height:auto; --f7-sheet-bg-color: #fff;"
      swipe-to-close
      backdrop
    >
      <f7-page-content>
        <f7-button @click="closeSheet()">
          <f7-icon f7="chevron_down"></f7-icon>
        </f7-button>
        <f7-block>
          <f7-list>
            <f7-list-input
              label="Rango de fechas"
              type="datepicker"
              @calendar:change="(value) => {getCalendarValue(value)}"
              placeholder="Rango de fechas"
              readonly
              :calendar-params="{
                locale: 'es',
                openIn: 'auto',
                header: true, 
                footer: true,
                dateFormat: 'yyyy-mm-dd', 
                rangePicker: true,
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                }"
            >Elegir días</f7-list-input>
            <f7-list-input
              label="Día específico"
              type="datepicker"
              @calendar:change="(value) => {getCalendarValue(value)}"
              placeholder="Elegir fecha"
              readonly
              :calendar-params="{
                locale: 'es',
                openIn: 'auto',
                header: true, 
                footer: true,
                dateFormat: 'yyyy-mm-dd',
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                }"
            >Día específico</f7-list-input>
          </f7-list>
        </f7-block>
      </f7-page-content>
    </f7-sheet>

    <f7-swiper pagination scrollbar class="chart-swiper">
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.tempA"></test-chart>
                <f7-button large raised fill @click="getDataHistory(selectedNode.nodeID, 'tempA')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.tempB"></test-chart>
                <f7-button large raised fill @click="getDataHistory(selectedNode.nodeID, 'tempB')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.tempC"></test-chart>
                <f7-button large raised fill @click="getDataHistory(selectedNode.nodeID, 'tempC')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.humidA"></test-chart>
                <f7-button large raised fill @click="getDataHistory(selectedNode.nodeID, 'humidA')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.humidB"></test-chart>
                <f7-button large raised fill @click="getDataHistory(selectedNode.nodeID, 'humidB')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.humidC"></test-chart>
                <f7-button large raised fill @click="getDataHistory(selectedNode.nodeID, 'humidC')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
            <f7-block>
                <test-chart :chart-data="datacollection.alcohol"></test-chart>
                <f7-button large raised fill @click="getDataHistory(selectedNode.nodeID, 'alcohol')">Actualizar</f7-button>
            </f7-block>
        </f7-swiper-slide>
    </f7-swiper>

    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button raised fill @click="slidePrev()">
            <f7-icon f7="chevron_left"></f7-icon>
          </f7-button>
        </f7-col>
        <f7-col>
          <f7-button raised fill sheet-open=".demo-sheet-swipe-to-close">Opciones</f7-button>
        </f7-col>
        <f7-col>
          <f7-button raised fill @click="slideNext()">
            <f7-icon f7="chevron_right"></f7-icon>
          </f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

  </f7-page>
</template>

<script>
  import { f7Page, f7Navbar, f7NavLeft, f7BlockTitle, f7Block, f7List, f7ListItem, f7ListInput, f7Icon, f7Button, f7Swiper, 
          f7SwiperSlide, f7Col, f7Row, f7Sheet, f7PageContent } from 'framework7-vue';
  import {get} from '../helpers/api';
  import {getSelectedNode} from '../helpers/globalVar';
  import testChart from '../components/charts/test';
  import moment from 'moment'

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7NavLeft,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7ListInput,
      f7Icon,
      f7Button, 
      f7Swiper, 
      f7SwiperSlide,
      f7Col, 
      f7Row, 
      f7Sheet, 
      f7PageContent,
      testChart
    },
    data () {
      return {
        selectedNode: {},
        datacollection: {
            tempA: null,
            tempB: null,
            tempC: null,
            humidA: null,
            humidB: null,
            humidC: null,
            alcohol: null,
        },
        // This Object will store arrays of objects with the form {value: float, date: String}
        extractedData: {
            tempA: [], //tempA = [{value: value1, date: date1}, {value: value2, date: date2}]
            tempB: [],
            tempC: [],
            humidA: [],
            humidB: [],
            humidC: [],
            alcohol: [],
        },
        testData: [],
        responseData: '',
        historyRange: []
      }
    },
    beforeMount () {

    },
    mounted () {
      this.selectedNode = getSelectedNode();
      this.initCharts();
      this.historyRange.push(moment().format('YYYY-MM-DD') + ' 00:00:00');
      console.log("Node history mounted");
    },
    created () {
      console.log("Node history created");
    },
    breforeDestroy () {
      console.log("Node history destroyed");
    },
    computed: {

    },
    methods: {
      getDataHistory: function (node, variable) { //, timeSpan, fromDate, toDate) {
        console.log(this.historyRange);
        const self = this;
        var options = this.getSensorTypeOpt(variable);

        var variableData = {
          value: 0,
          date: ""
        }
        var chartOptions = {
          labels: [],
          datasets: [
            {
              label: options.label,
              backgroundColor: options.backgroundColor,
              data: []
            }
          ]
        };
        var resource = "nodes/" + String(node) + "/history/" + variable;
        //just for testing
        var timeSpan = "hours";
        var fromDate = this.historyRange[0];
        var toDate = this.historyRange.length > 1 ? this.historyRange[1] : moment().format('YYYY-MM-DD HH:mm:ss');
        console.log("From: " + fromDate + " to: " + toDate);
        resource = this.getResource(String(node), variable, timeSpan, fromDate, toDate);
        self.$f7.dialog.preloader('Recopilando Data');
        get(
          resource, 
          response => {
            var inData = response.data;
            this.responseData = JSON.stringify(response.data);
            this.extractedData[variable] = [];

            //La data viene de atrás para adelante
            for (var i=0; i<inData.length; i++) { //(i=inData.length-1; i>=0; i--)
              chartOptions.labels.push((inData[i].date)); //.substring(11, 16));
              chartOptions.datasets[0].data.push(inData[i][variable]);
              this.testData.push(inData[i][variable]);
              //Storing data for future use
              variableData.value = inData[i][variable];
              variableData.date = inData[i].date;
              this.extractedData[variable].push(variableData);
            }
            self.$f7.dialog.close();
            this.datacollection[variable] = chartOptions;
            console.log(inData);
          },
          error => {
            self.$f7.dialog.close();
            console.log("Error al hacer http request: ", error);
          }
        )
      },
      slideNext: function() {
        this.$f7.swiper.get('.chart-swiper').slideNext();
      },
      slidePrev: function() {
        this.$f7.swiper.get('.chart-swiper').slidePrev();
      },
      getSensorTypeOpt: function(type) {
        switch (type) {
          case "tempA":
            return {label: "Temperatura Sensor A", backgroundColor: '#DF0101'};
            break;
          case "tempB":
            return {label: "Temperatura Sensor B", backgroundColor: '#DF0101'};
            break;
          case "tempC":
            return {label: "Temperatura Sensor C", backgroundColor: '#DF0101'};
            break;
          case "humidA":
            return {label: "Humedad Sensor A", backgroundColor: '#0431B4'};
            break;
          case "humidB":
            return {label: "Humedad Sensor B", backgroundColor: '#0431B4'};
            break;
          case "humidC":
            return {label: "Humedad Sensor C", backgroundColor: '#0431B4'};
            break;
          case "alcohol":
            return {label: "Concentración de Alcohol", backgroundColor: '#31B404'};
            break;
          default:
            return {label: "Indefinido", backgroundColor: '#31B404'};
            break;
        }
      },
      initCharts: function() {
        var variables = [
          "tempA",
          "tempB",
          "tempC",
          "humidA",
          "humidB",
          "humidC",
          "alcohol"
        ];
        for (var i = 0; i < 7; i++) {
          var options = this.getSensorTypeOpt(variables[i]);
          var chartOptions = {
            labels: [],
            datasets: [
              {
                label: options.label,
                backgroundColor: options.backgroundColor,
                data: []
              }
            ]
          };
          this.datacollection[variables[i]] = chartOptions
        }
      },
      getResource: function(node, variable, timeSpan, fromDate, toDate) {
        var resource = "nodes/" + String(node) + "/history/" + variable + 
        "?timeSpan=" + timeSpan + "&fromDate=" + fromDate + "&toDate=" + toDate;
        return resource;
      },
      closeSheet: function() {
        this.$f7.sheet.close();
      },
      getCalendarValue(date) {
        this.historyRange = [];
        for (var i=0; i<date.length; i++) {
          var stringDate = moment(date[i]).format('YYYY-MM-DD HH:mm:ss');
          this.historyRange.push(stringDate);
        }
      }
    }
  };
</script>