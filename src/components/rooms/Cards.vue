<template>
  <div>
      <div class="row" v-if="rooms.length > 0">
        <div class="col-sm-4 mb-4 d-flex align-items-stretch" v-for="room in rooms" :key="room.id">
          <div class="card shadow">
            <div class="card-header horizontal">
              <router-link :to="{ name: 'professional.customer', params: { id: room.customer.id }}">
                <hover-overlay rounded="true" icon="user">
                  <avatar :src="room.customer.photo" :username="room.customer.public_name"></avatar>
                </hover-overlay>              
              </router-link>              
              <div class="h-space-10"></div>
              <div class="vertical middle">
                <h6>{{ room.category.name }}</h6>
                <h6>{{ room.location }}</h6>
              </div>
            </div>
            <router-link :to="{ name: 'professional.room', params: { id: room.id }}">
              <img class="card-img-top" :src="room.photo">              
              <div class="card-subtitle">
                {{ room.title }} {{ room.title }}
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
      </div>
      <div v-else>
        <h5>Nenhum comodo encontrado</h5>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    rooms: {
      name: "rooms",
      type: Array      
    },    
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

  .card-subtitle {
    background: $pink;
    color: $white;
    font-weight: $bold;
    padding: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .blockquote-footer {
    font-size: 15px;
  }
</style>