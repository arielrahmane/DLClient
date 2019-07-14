import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'testChart',
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
  components: {
    
  },
  data () {
    return {

    }
  },
  beforeMount () {

  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },
  created () {
    
  },
  breforeDestroy () {
    
  },
  computed: {

  },
  methods: {
    
  }
};