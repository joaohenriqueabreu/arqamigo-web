<template>
  <div class="vertical middle center full-width mb-5">
      <h4 class="mb-4">Casa? Escritório? Área Gourmet? Escolha uma</h4>
      <div class="horizontal full-width">
        <div class="col-sm-3"></div>
        <div class="col-sm-6 group text-left bg-white mr-1">                                    
            <input type="text" v-model="term" @input="filterCategories()" name="term" placeholder="Buscar ambientes"> 
            <font-awesome-icon icon="search"></font-awesome-icon>           
        </div>
      </div>      
      <div class="row horizontal middle center mb-5">          
          <div class="cat mb-2 mr-1 clickable position-relative" 
            v-for="category in categories" :key="category.name" 
            @click="selectCategory(category.name)">              
              <hover-overlay radioMode :id="category.name" ref="hover" class="d-flex align-items-stretch text-center full-height" :text="category.name">
                <img :src="category.url" class="full-width full-height">            
              </hover-overlay>                        
          </div>  
          <input type="hidden" v-model="getRoom.category.id" name="category_id">        
      </div>
  </div>
</template>

<script>
import baseCategories from '@/assets/images/categories/categories.js'
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            categories: baseCategories,
            categoryId: '',
            term:       '',
            hovering:   []
        }
    },  
    methods: {
        ...mapActions(['completeStep', 'revertStep']),
        filterCategories() { 
            let self = this           
            // Need to refresh categories in every search            
            this.categories = baseCategories
            this.categories = this.categories.filter(category => {                
                return category.name.toLowerCase().includes(self.term.toLowerCase())
            })
        },
        selectCategory(index) {                        
            this.clearSelection()            
            const item = this.$refs.hover.filter(hoverItem => hoverItem.id === index)            
            item[0].select()
            this.categoryId = index
            this.completeStep({step: this.$config.CATEGORIES_STEP, proceed: true})                        
        },
        clearSelection() {
            this.revertStep(this.$config.CATEGORIES_STEP)            
            for(let i = 0; i < this.categories.length; i++) { 
                this.$refs.hover[i].unselect() 
            }
        }
    },
    computed: {
        ...mapGetters(['getRoom'])
    }    
}
</script>

<style lang="scss" scoped>
    .cat {
        width: 200px;
        height: 150px;             
    }

    .text-center {
        font-size: $large;
        font-weight: $bold;
    }
</style>