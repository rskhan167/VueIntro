var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    content: 'This is a brand new adidas socks priced at $3.25 only!!',
    image: './images/pink-socks.jpg',
    inventory: 20,
    onSale: true,
    inStock: true,
    details: ["80% cotton", "20% polyester", "Gender-Neutral"],
    variants: [
      {
        variantId: 2235,
        variantColor: "pink",
        variantImage: './images/pink-socks.jpg'
      },
      {
        variantId: 2236,
        variantColor: "red",
        variantImage: './images/red-socks.jpg'
      }
    ],
    cart: 0,
  },
  methods: {
    addToCart: function(){
      if(this.cart<5){
        this.cart += 1;
        //console.log(this);
        this.inventory -= 1;
      }else{
        alert("Cannot add more than 5 items per product!");
      }
      
    },
    removeCart: function(){
      if(this.cart>0){
        this.cart -= 1;
        this.inventory += 1;
      }else{
        alert("Cart is empty")
      }
    },
    updateProduct: function(variantImage){
      this.image = variantImage;
    }
  }
})