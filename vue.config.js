module.exports = {
  // "devServer": {
  //   "proxy": "http://localhost:8080/"
  // },
  "css": {
    "loaderOptions": {
      "scss": {
        "prependData": `@import "@/assets/styles/lib.scss";`
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  "transpileDependencies": [
    "vuetify"
  ]
}