<template>
  <div>
    <div class="row" v-if="rooms.length > 0">
        <div class="col-sm-4 d-flex align-items-stretch" v-for="customer in customers" :key="customer.id">
            <div class="card shadow">
                <div class="card-body horizontal middle">                    
                    <avatar :src="customer.photo" :username="customer.public_name"></avatar>
                    <div class="vertical ml-4">
                        <h6>{{ customer.public_name }}</h6>
                        <div class="mb-2">
                            <font-awesome-icon class="icon shadow mr-2" :icon="['far', 'envelope']"></font-awesome-icon>
                            <span>{{ customer.email }}</span>
                        </div>
                        <div class="mb-2">
                            <font-awesome-icon class="icon shadow mr-2" icon="map-marker-alt"></font-awesome-icon>
                            <span>{{ customer.location }}</span>
                        </div>
                        <div>
                            <font-awesome-icon class="icon mr-2" icon="phone"></font-awesome-icon>
                            <span>{{ customer.phone }}</span>
                        </div>
                    </div>
                </div>                
            </div>
        </div>    
    </div>    
    <div v-else>Nenhum cliente encontrado</div>
  </div>
</template>

<script>
export default {
    props: {
        customers: {
            name: 'customer',
            type: Array
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        width: 100%;
        padding: 20px;
    }

    .icon {
        color: $pink;
        font-weight: $bold;
    }

    span {
        font-size: 13px;
    }
</style>