<template>
  <div>
    <div class="card shadow full-height">
      <div class="card-header horizontal justify-content-between">
        <div class="horizontal">
          <router-link v-if="isProfessional" :to="{ name: `${isCustomer ? 'customer.professional' : 'professional.customer'}`, params: { id: room.customer.id }}">
            <hover-overlay rounded="true" icon="user">
              <avatar :src="room.customer.photo" :username="room.customer.name"></avatar>
            </hover-overlay>              
          </router-link>              
          <div class="h-space-10"></div>
          <div class="vertical middle">
            <h6>{{ room.category.name }}</h6>
            <h6 v-if="isProfessional">{{ room.location }}</h6>
          </div>
        </div>
        <hover-overlay icon="home" :rounded="true">
          <router-link v-if="room.num_consultings > 0" :to="{ name: `${isCustomer ? 'customer' : 'professional' }.room`, params: { id: room.id }}" class="vertical middle center rounded-circle py-3 px-4 color-pink bg-white clickable shadow bold">
            {{ room.num_consultings }}
          </router-link> 
        </hover-overlay>       
      </div>
      <router-link :to="{ name: `${isCustomer ? 'customer' : 'professional' }.room`, params: { id: room.id }}">
        <img class="card-img-top" :src="room.photo">              
        <div class="card-subtitle">
          {{ room.title }}
        </div>
      </router-link>
      <div class="card-body">
        <blockquote class="blockquote">
          <footer class="blockquote-footer">
            {{ room.description }} {{ room.description }} {{ room.description }} 
          </footer>                
        </blockquote>              
      </div>
    </div>                         
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    room: Object
  },
  computed: {
    ...mapGetters(['isCustomer', 'isProfessional'])
  }

}
</script>

<style lang="scss" scoped>
  .card-header {
    background: $white;

    h6 {
      font-weight: $bold;
      font-size: 13px;
      color: $gray;
    }
  }  

  .card {
    width: 350px;
  }

  .card-subtitle {
    background: $pink;
    color: $white;
    font-weight: $bold;
    padding: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .card-img-top {
    height: 350px;
    width: 350px;
    object-fit: contain;
  }

  .blockquote-footer {
    font-size: 12px;
  }
</style>