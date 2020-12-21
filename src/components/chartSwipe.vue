<template>
  <div class="chartSwipe">
    <f7-swiper-slide>
        <f7-block>
            <test-chart :chart-data="datacollection.tempA"></test-chart>
            <f7-button large raised fill @click="getDataHistory(selectedNode.nodeID, 'tempA')">Actualizar</f7-button>
        </f7-block>
    </f7-swiper-slide>
  </div>
</template>

<script>
import testChart from './charts/test';


export default {
  name: 'menuItem',
  props: {
    link: {
      type: String,
      default: ''
    },
    service: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'help'
    },
    iconStyle: {
      type: Object,
      default: () => ({
        size: '50',
        color: 'black'
      })
    },
    label: {
      type: String,
      default: 'No Name'
    },
    labelStyle: {
      type: Object,
      default: () => ({
        size: '3',
        color: 'black'
      })
    },
    closePanel: {
      type: Boolean,
      default: false
    },
    closePopup: {
      type: Boolean,
      default: false
    },
    clickAction: {
      type: Object,
      default: () => ({
        name: 'noAction',
        value: ''
      })
    },
    labelIcon: {
      type: Object,
      default: () => ({
        name: '',
        color: 'green'
      })
    }
  },
  created () {
    console.log('menuItem component created')
    let that = this
    this.$bus.$on('session-finished', () => {
      console.log('ON EVENT: session-finished')
      that.logout()
    })
  },
  computed: {
    iconClass () {
      return 'icon-' + this.icon
    },
    compLabelStyle () {
      let ls = this.labelStyle
      let attrs = {
        'font-size': ls.size,
        'color': ls.color
      }

      if (!this.service) attrs['font-weight'] = 'bold'

      return attrs
    }
  },
  methods: {
    onClick (action) {
      switch (action.name) {
        case 'logout':
          this.logout()
          break
        case 'changeService':
          console.log(this.$settings.currentService, action)
          this.$engine.settings.set({currentService: action.value})
          console.log(this.$settings.currentService)
          let service = getServiceName(action.value.id)
          this.$bus.emit('service:change', service)
          let serviceInbox = '/' + service + '/inbox/'
          console.log('Routing to: ', serviceInbox)
          this.$f7.mainView.router.load({url: serviceInbox})
          break
        case 'noAction':
          console.log('Clicked on menu item')
          break
        default:
          console.log(action, ' is not a defined method')
      }
    }
  }
}
</script>