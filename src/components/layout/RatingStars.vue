<template>
  <div>
      <div v-if="short">
          <div v-if="rating.rate > 0">
            <font-awesome-icon class="icon mr-1" icon="star"></font-awesome-icon>
            <small class="bold">{{ rating.rate }}</small>
          </div>          
      </div>
      <div class="horizontal center middle" v-else>
        <div v-if="filledStars > 0">
            <font-awesome-icon v-for="star in filledStars" :key="star" class="icon" icon="star"></font-awesome-icon>
        </div>      
        <div v-if="halfStar">
            <font-awesome-icon class="icon" icon="star-half-alt"></font-awesome-icon>      
        </div>      
        <div v-if="noStars > 0">
            <font-awesome-icon v-for="star in noStars" :key="`no-${star}`" class="icon" :icon="['far', 'star']"></font-awesome-icon>
        </div>
        <div v-if="rating.amount > 0">
            <small>({{ rating.amount }})</small>
        </div>      
      </div>
  </div>
</template>

<script>
const MAX_RATE = 5
export default {
    props: {
        rating: Object,
        short: { type: Boolean, default: false }        
    },
    computed: {
        greaterThan() { return Math.round(this.rating.rate) > this.rating.rate },        
        filledStars() { return Math.floor(this.rating.rate) },
        halfStar() { return Math.round(this.rating.rate) > this.filledStars },
        noStars() { return MAX_RATE - (this.filledStars + this.halfStar) }
    }
}
</script>

<style>

</style>