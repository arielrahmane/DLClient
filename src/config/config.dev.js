export default {
  debug: false,
  api: {
    version: '',
    protocol: 'http',
    host: '192.168.4.1',
    port: '8081',
    address: function () {
      return this.protocol +
      '://' +
      this.host +
      (this.port !== '' ? ':' + this.port : '') +
      '/' +
      (this.version !== '' ? this.version + '/' : '')
    }
  },
  crypto: {
    secret: 'arielraspi'
  }
}
