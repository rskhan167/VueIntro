var eventBus = new Vue()

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">

      <div class="product-image">
        <img v-bind:src="image">
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <span v-show="onSale" class="onsale">On Sale!</span>
        <p>{{ content }}</p>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out!</p>
        <p v-else>Out of stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="(variant, index) in variants" 
            :key="variant.variantId" 
            class="color-box"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>

        <div class="buttons">
          <button v-on:click="addToCart" :disabled="!inStock"  class="addBtn" :class="{ disabledButton: !inStock }">Add to Cart</button>
          <button v-on:click="removeCart" class="removeBtn">Remove from Cart</button>
        </div>

      </div>
      <product-tabs :reviews="reviews"></product-tabs>
      
    </div>
  `,
  data() {
    return {
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
          variantQuantity: 10,
        },
        {
          variantId: 2236,
          variantColor: "red",
          variantImage: './images/red-socks.jpg',
          variantQuantity: 5,
        }
      ],
      reviews: []
    }
  },
  methods: {
    addToCart: function(){
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        //console.log(this);
        this.inventory -= 1;
        //console.log(this.inventory);
        this.variants[this.selectedVariant].variantQuantity -= 1;
        //console.log(this.variants[this.selectedVariant].variantQuantity);
    },
    removeCart: function(){
        this.$emit('remove-cart')
        this.inventory += 1;
        this.variants[this.selectedVariant].variantQuantity += 1;
        //console.log(this.variants[this.selectedVariant].variantQuantity);
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
      //console.log(this.variants.length);
      let total = 0;
      for(let i=0;i<this.variants.length;i++){
        total += this.variants[i].variantQuantity;
      }
      //console.log(total);
      return total;
    },
    onSale() {
      if(this.inventory < 1){
        return false;
      }
      else{
        return true;
      }
    },
    shipping(){
      if(this.premium){
        return "Free"
      }
      return `$${0.75}`
    }
  },
  mounted(){
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
})


Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>
      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null
    }
  },
  methods: {
    onSubmit() {
      let productReview ={
        name: this.name,
        review: this.review,
        rating: this.rating
      }
      eventBus.$emit('review-submitted', productReview)
      this.name = null
      this.review = null
      this.rating = null
    }
  }
})

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: false
    }
  },
  template: `
    <div>
      <ul>
        <span class="tab"
          :class="{ activeTab: selectedTab === tab }" 
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectedTab = tab"
          >{{ tab }}</span>
      </ul> 

        <div v-show="selectedTab === 'Reviews'">
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul v-else>
            <li v-for="(review, index) in reviews" :key="index">
              <p>{{ review.name }}</p>
              <p>Rating: {{ review.rating }}</p>
              <p>{{ review.review }}</p>
            </li>
          </ul>
        </div> 

        <div v-show="selectedTab === 'Make a Review'">
          <product-review></product-review>
        </div>

    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'      
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id){
      this.cart.push(id);
    },
    removeCart(id){
      if(this.cart.length>0){
        this.cart.pop(id);
      }else{
        alert("Cart is empty");
      }
    }
  }
})