var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    brand: 'Adidas',
    content: 'This is a brand new adidas socks priced at $3.25 only!!',
    selectedVariant: 0,
    details: ["80% cotton", "20% polyester", "Gender-Neutral"],
    variants: [
      {
        variantId: 2235,
        variantColor: "pink",
        variantImage: './images/pink-socks.jpg',
        variantQuantity: 5,
      },
      {
        variantId: 2236,
        variantColor: "red",
        variantImage: './images/red-socks.jpg',
        variantQuantity: 0,
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
        this.variants[this.selectedVariant].variantQuantity -= 1;
        //console.log(this.variants[this.selectedVariant].variantQuantity);
      }else{
        alert("Cannot add more than 5 items per product!");
      }
      
    },
    removeCart: function(){
      if(this.cart>0){
        this.cart -= 1;
        this.inventory += 1;
        this.variants[this.selectedVariant].variantQuantity += 1;
        //console.log(this.variants[this.selectedVariant].variantQuantity);
      }else{
        alert("Cart is empty")
      }
    },
    updateProduct: function(index){
      this.selectedVariant = index;
      //console.log(index);
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image(){
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    inventory() {
      let total = 0;
      total += this.variants[this.selectedVariant].variantQuantity;
      return total;
    },
    onSale() {
      if(this.inventory < 1){
        return false;
      }
      else{
        return true;
      }
    }
  }
})