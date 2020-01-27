Vue.use(VueLazyload)

new Vue({
  el: '#app',
  data() {
    return {
      loading: true,
      error: false,
      products: [],
      currPage: 2
    }
  },

  methods: {
    getMore() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop  + window.innerHeight === document.documentElement.offsetHeight
        
        if (bottomOfWindow) {        
          axios.get(`https://www.summersalt.com/collections/swimwear/products.json?page=${this.currPage}`)
          .then(res => {
            if (res.data.products.length) {
                res.data.products.forEach(product => {
                  this.products.push(product)
                });
                this.currPage++
              } else {
                this.loading = false
              }
            })
            .catch(err => {
              console.log(err)
              this.error = true
            })
        }
      }
    }
  },

  //run get more on user scroll until there's no more data to get
  mounted() { 
    this.getMore()
  },

  // on instance creation get first page of products
  created() {
    axios.get('https://www.summersalt.com/collections/swimwear/products.json?page=1')
    .then(res => {
      this.products = res.data.products
    })
    .catch(err => {
      console.log(err)
      this.error = true
    })
  }
})