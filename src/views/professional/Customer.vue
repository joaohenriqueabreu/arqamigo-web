<template>
  <div>
      <div v-if="hasCustomer" class="vertical center">          
        <avatar :src="customer.photo" :username="customer.name" :size="200"></avatar>    
        <div class="mb-4"></div>             
        <h3>{{ customerName }}</h3>
        <div class="mb-4"></div>          
        <div v-if="hasPrivateAccessToCustomer" class="p-4 shadow full-width color-white mb-4 bg-light-pink vertical center middle">
            <span>O cliente autorizou seu contato! 
                <a :href="`https://wa.me/55${customer.private.phone}?text=${introMessage()}`" class="clickable color-dark-white" target="_blank">Continue a conversa pelo whatsapp 
                <font-awesome-icon class="mr-1" :icon="['fab','whatsapp']"></font-awesome-icon> </a> 
                ou ligue para o cliente.</span>
        </div>
        <div class="bg-white shadow row full-width p-4">            
            <div class="col-sm-2"></div>
            <div class="col-sm-8 vertical">
                <div class="horizontal mb-2">
                    <font-awesome-icon class="icon" :icon="['far', 'envelope']"></font-awesome-icon>
                    <h6 class="mr-3">E-mail</h6>
                    <span v-if="hasPrivateAccessToCustomer">{{ customer.private.email }}</span>
                    <private-info v-else></private-info>
                </div>
                <div class="horizontal mb-2">
                    <font-awesome-icon class="icon" icon="phone"></font-awesome-icon>
                    <h6 class="mr-3">Telefone</h6>
                    <span v-if="hasPrivateAccessToCustomer">{{ customer.private.phone }}</span>
                    <private-info v-else></private-info>
                </div>
                <div class="horizontal mb-2">
                    <font-awesome-icon class="icon" icon="map-marker-alt"></font-awesome-icon>
                    <h6 class="mr-3">Endereço</h6>
                    <span>{{ customer.location }}</span>                    
                </div>
            </div>
        </div>
        <div class="mb-4"></div>
        <div class="bg-white shadow full-width d-flex p-5">
            <div class="col-sm-3"></div>
            <div class="col-sm-6 justify-content-between horizontal">
                <div class="vertical middle center">                    
                    <rating-stars :rating="customer.rating"></rating-stars>
                    <div class="mb-2"></div>
                    <h6>Avaliação</h6>
                </div>
                <div class="vertical middle center">
                    <h4>{{ random() }}</h4>
                    <p>Dicas solicitadas</p>
                </div>
                <div class="vertical middle center">
                    <h4>{{ random() }}</h4>
                    <p>Projetos</p>
                </div>
            </div>            
        </div>
        <div class="mb-4"></div>
        <h4>Dicas com você</h4>
        <div class="mb-4"></div>
        <div v-if="hasConsultedWithProfessional" class="full-width">
            <consulting-card v-for="consulting in customerConsultings" :key="consulting.id" :consulting="consulting"></consulting-card>
        </div>
        <div v-else class="horizontal middle center">
            Nenhuma dica ainda
        </div>
      </div>      
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import PrivateInfo from '@/components/customer/PrivateInfo'
import RatingStars from '@/components/layout/RatingStars'
import ConsultingCard from "@/components/consulting/Card"

export default {
    components: {
        'private-info': PrivateInfo,
        'rating-stars': RatingStars,
        'consulting-card': ConsultingCard
    },
    mounted() {    
        this.loadCustomer(this.$route.params.id)        
    },
    methods: {
        ...mapActions('customer', ['loadCustomer']),
        random: () => Math.round(Math.random() * 10),
        introMessage() {
            return encodeURI(`Olá ${this.customerName}, vamos continuar nosso contato do Reforma Já`)
        }
    },
    computed: {
        ...mapState({ customer: state => state.customer.customer }),
        ...mapGetters('customer', ['hasCustomer', 'hasPrivateAccessToCustomer', 'hasConsultedWithProfessional', 'customerConsultings']),
        customerName() { return this.hasPrivateAccessToCustomer ? this.customer.private.name : this.customer.public_name }        
    }
}
</script>

<style>

</style>