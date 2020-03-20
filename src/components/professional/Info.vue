<template>
  <div>
      <div class="horizontal align-items-between middle single-line">
          <font-awesome-icon 
            v-if="professional.is_verified" 
            icon="check-circle" 
            class="mr-2 icon" 
            data-toggle="tooltip"
            title="O perfil deste profissional foi verificado pelo nosso time">
        </font-awesome-icon>
          <router-link :to="`/customer/professionals/${professional.id}`">
            <span class="single-line mb-0 mr-2">{{ professional.has_company_name ? professional.company_name : professional.name }}</span>
          </router-link>
          <rating-stars :rating="professional.rating" :short="short" v-if="! norating"></rating-stars>
      </div>
  </div>
</template>

<script>
import RatingStars from '@/components/layout/RatingStars';
export default {
    components: {
        'rating-stars': RatingStars
    },
    props: {
        professional:   Object,
        short:          { type: Boolean, default: true },
        norating:       { type: Boolean, default: false }        
    }
}
</script>

<style>

</style>