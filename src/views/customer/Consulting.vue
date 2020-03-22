<template>
  <div>    
    <loading-gif>
      <div v-if="hasConsulting">
        <div class="horizontal center">
          <h2>{{ getConsulting.room.title }}</h2>          
        </div>        
        <hr class="mb-5">
        <consulting-comment :userId="getConsulting.room.customer.id" :comment="genConsultingAsComment">          
           <font-awesome-icon icon="home" class="icon mr-1"></font-awesome-icon> {{ getConsulting.room.category.name }} <br> 
           <font-awesome-icon icon="ruler" class="icon mr-1"></font-awesome-icon> <b>{{ getConsulting.room.width }}{{ $config.UNIT_OF_MEASURE }} x {{ getConsulting.room.length }}{{ $config.UNIT_OF_MEASURE }}</b><br>           
           <font-awesome-icon icon="map-marker-alt" class="icon mr-2"></font-awesome-icon> {{ getConsulting.room.location }}
        </consulting-comment>
        <div class="v-space-20"></div>
        <consulting-comment :comment="genConsultingAsComment">
           {{ getConsulting.room.description }}           
        </consulting-comment>
        <div class="v-space-20"></div>
        <consulting-comment v-for="comment in getConsulting.comments" :key="comment.id" :comment="comment">
           {{ comment.content }}           
        </consulting-comment>
        <div class="reply">
          <comment-reply></comment-reply>
        </div>
      </div> 
    </loading-gif>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ConsultingComment  from '@/components/consulting/Comment';
import CommentReply       from '@/components/consulting/Reply';

export default {
  components: {
    'consulting-comment': ConsultingComment,
    'comment-reply':      CommentReply
  },  
  mounted() {    
    this.loadConsulting(this.$route.params.id);
    this.newComment();        
  },
  methods: {
    ...mapActions(['setPageSubtitle', 'loadConsulting', 'newComment'])
  },  
  computed: {
    ...mapGetters(['hasConsulting', 'getConsulting']),
    genConsultingAsComment() {
      return {
        id: 0,
        sender: {
          id:     this.getConsulting.room.customer.id,
          name:   this.getConsulting.room.customer.name,
          photo:  this.getConsulting.room.customer.photo,
          date:   this.getConsulting.room.created_at,
          type:   this.$config.SENDER_CUSTOMER
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .reply {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
  }
</style>