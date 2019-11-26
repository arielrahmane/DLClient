export default {
  debug: false,
  api: {
    version: '',
    protocol: 'https',
    //host: 'opendl.localtunnel.me',
    host: '2893c42a.ngrok.io',
    port: '',
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
