<template>
  <div>
    <h4>Enviar documentos</h4>
    <div class="v-space-20"></div>
    <div class="row">          
        <div class="col-sm-2"></div>
        <div class="col-sm-8 text-justify">
            <small>
                O envio de documentos é importante para sua credibilidade junto aos potenciais clientes na plataforma. Ao enviar documentos como seu certificado do CAU, CNPJ, seu perfil será verificado por nosso time e receberá as ensígneas. Elas lhe darão maior destaque quando o perfil de sua empresa for procurado e ao interagir com os clientes maior confiança para que eles autorizem o seu contato, potencializando infinitamente o envio de uma proposta comercial.
            </small>
        </div>
    </div>
    <div class="v-space-50"></div>
    <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8 row">
            <div class="col-sm-3" v-for="doc in docTypes" :key="doc">
                <span v-if="isPending(doc)" class="rounded-pill clickable pending" @click="uploading(doc)">
                    <file-uploader docmode ref="fileUploader" :label="doc"></file-uploader>                
                </span>            
                <span v-else class="horizontal middle center rounded-pill">
                    <font-awesome-icon icon="check-circle"></font-awesome-icon>
                    {{doc}}
                </span>
            </div>
        </div>        
    </div>
    <div class="v-space-50"></div>      
  </div>
</template>

<script>
import FileUploader from '@/components/layout/FileUploader'
const DOC_TYPES = ['CAU', 'Receita', 'Endereço', 'CNPJ']
export default {
        components: {
            'file-uploader': FileUploader
        },
        data: function () {
            return {
                docTypes:       DOC_TYPES,
                pending:        DOC_TYPES,
                lastClicked:    null                    
             }
        },
        mounted () {
            this.$on(this.$config.IMAGE_UPLOADED, ({ url }) => {
                // TODO dispatch update document action
                this.pending = this.pending.filter((docType) => docType !== this.lastClicked)
            })
        },
        methods: {
            isPending (docType) { return this.pending.includes(docType) },
            uploading (docType) { this.lastClicked = docType }                                             
        },        
    }
</script>

<style lang="scss" scoped>
    span {    
        padding: 10px;
        background: $brand;
        color: $white;
        min-width: 10vw;
        font-weight: $bold;
        display: inline-block;

        &.pending {
            background: $white;
            color: $brand;
            border: 2px solid $brand;

            &:hover {
                @extend .transition-ease;
                background: $brand;
                color: white;   
            }
        }
    }
</style>