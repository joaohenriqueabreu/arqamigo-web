<template>
  <div>    
    <loading-gif>
      <div v-if="hasRoom">
        <div class="horizontal center">
          <h2>{{ getRoom.title }}</h2>          
        </div>        
        <hr class="mb-5">
        <room-comment :sender="$config.SENDER_CUSTOMER" :viewer="$config.SENDER_PROFESSIONAL" special
          :name="getRoom.customer.public_name"
          :photo="getRoom.customer.photo"
          date="05/03/2020">
           <font-awesome-icon icon="home" class="icon mr-1"></font-awesome-icon> {{ getRoom.category.name }} <br> 
           <font-awesome-icon icon="ruler" class="icon mr-1"></font-awesome-icon> <b>{{ getRoom.width }}{{ $config.UNIT_OF_MEASURE }} x {{ getRoom.length }}{{ $config.UNIT_OF_MEASURE }}</b><br>           
           <font-awesome-icon icon="map-marker-alt" class="icon mr-2"></font-awesome-icon> {{ getRoom.location }}
        </room-comment>
        <div class="v-space-20"></div>
        <room-comment :sender="$config.SENDER_CUSTOMER" :viewer="$config.SENDER_PROFESSIONAL"
          :name="getRoom.customer.public_name"
          :photo="getRoom.customer.photo"
          :medias="getRoom.medias"
          date="05/03/2020">
           {{ getRoom.description }}           
        </room-comment>
        <div class="v-space-20"></div>
        <room-comment v-for="comment in getRoom.comments" :key="comment.id" :sender="comment.user.category"
          :name="comment.user.public_name"
          :photo="comment.user.photo"
          :medias="comment.medias"
          date="05/03/2020">
           {{ comment.description }}           
        </room-comment>
        <div class="reply">
          <comment-reply></comment-reply>
        </div>
      </div> 
    </loading-gif>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RoomComment from '@/components/rooms/Comment';
import CommentReply from '@/components/rooms/Reply';

export default {
  components: {
    'room-comment': RoomComment,
    'comment-reply': CommentReply
  },  
  mounted() {    
    this.loadRoom(this.$route.params.id)        
  },
  methods: {
    ...mapActions(['setPageSubtitle', 'loadRoom'])
  },  
  computed: {
    ...mapGetters(['hasRoom', 'getRoom'])
  }
}
</script>

<style lang="scss" scoped>
  .icon {
    color: $pink;
  }

  .reply {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
  }
</style>