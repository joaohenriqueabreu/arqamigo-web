<template>
    <div class="horizontal middle center">
        <div v-if="showCamera" class="media-button clickable" v-on:click="openImageUploader('camera')" v-tooltip.top-center="'Tirar uma fota'">
            <i class="fas fa-camera"></i>
        </div>
        <div v-if="showVideo" class="media-button clickable" v-on:click="openImageUploader('local')" v-tooltip.top-center="'Enviar um video'">
            <i class="fas fa-video"></i>
        </div>
        <div class="media-button clickable" :class="docmode ? 'dark' : ''" v-on:click="openImageUploader('local')" v-tooltip.top-center="docmode ? '' : 'Enviar uma imagem'">
            <i class="fas" :class="docmode ? 'fa-arrow-circle-up' : 'fa-images'"></i>
        </div>
        <div v-if="showInstagram" class="media-button clickable" v-on:click="openImageUploader('instagram')" v-tooltip.top-center="'Adicione uma imagem do seu instagram'">
            <i class="fab fa-instagram"></i>
        </div>

        <input type="hidden" name="images" v-model="images">
        <input type="hidden" name="videos" v-model="videos">
    </div>
</template>

<style lang="scss">    

    .media-button {
        color:          white;
        background:     transparent;

        &.dark {
            color: $pink;

            &:hover {
                color:  $pink;
            }
        }

        &:hover {
            color: purple;
        }

        i {
            margin-right:   20px;
            font-size:      20px;
        }
    }
</style>

<script>
    const CLOUD_NAME = 'arquiamigo';
    const ALLOWED_MEDIA_FORMATS = [
        '3gp', 'png', 'jpg', 'jpeg', 'tiff', 'gif', 'avi', 'flv', 'wmv', 'mp4', 'mov', 'ogg', 'pdf'
    ];
    export default {
        data: function () {
            return {
                hover:  false,
                images: [],
                docs:   [],
                videos: [],
                media:  {},
            }
        },
        mounted () {            
            let cloudinaryScript = document.createElement('script');
            cloudinaryScript.setAttribute('src', 'https://widget.cloudinary.com/v2.0/global/all.js');
            document.body.appendChild(cloudinaryScript)
        },
        props: { 
            video:      { type: Boolean, default: true },
            instagram:  { type: Boolean, default: true },
            camera:     { type: Boolean, default: true },
            docmode:    { type: Boolean, default: false }
        },
        methods: {
            openImageUploader: function (source) {
                cloudinary.openUploadWidget({
                    cloud_name:             CLOUD_NAME,
                    upload_preset:          'geiyc85i',
                    defaultSource:          source,
                    resourceTypes:          ['image', 'raw'],
                    maxFiles:               1,
                    maxFileSize:            20000000, // 20MB
                    clientAllowedFormats:   ALLOWED_MEDIA_FORMATS,
                    cropping:               true,
                    folder:                 'customer',
                    sources:                this.fileSources,
                    language:               'pt-Br',
                },
                (error, result) => {
                    if (result && result.event === "success") {
                        console.log(result.info);
                        this.media = {
                            'name':             result.info.original_filename + '.' + result.info.format,
                            'public_id':        result.info.public_id,
                            'type':             result.info.resource_type,
                            'resouce_type':     result.info.resource_type,
                            'format':           result.info.format,
                            'url':              result.info.secure_url,
                            'thumbnail_url':    result.info.thumbnail_url
                        };

                        if (result.info.resource_type === IMAGE_TYPE) {                            
                            this.images.push(JSON.stringify([this.media]));
                            if (this.docmode) { this.docs = this.images; }
                        }

                        if (result.info.resource_type === VIDEO_TYPE) {
                            this.videos.push(JSON.stringify([this.media]));
                            this.$parent.$emit(VIDEO_UPLOADED, result.info);
                        }
                    }

                    if (result && result.event === "close" && this.images.length > 0) {
                        this.$parent.$emit(IMAGE_UPLOADED, this.media);
                    }                    
                });
            },

            openVideoUploader: function () {
                this.$modal.show('youtube-link');
            },
        },
        computed: {
            showCamera: function ()     { return this.camera    && ! this.docmode; },
            showVideo: function ()      { return this.video     && ! this.docmode; },
            showInstagram: function ()  { return this.instagram && ! this.docmode; },
            fileSources: function () {
                let sources = ['local'];
                if (this.showCamera)    { sources.push('camera'); }
                if (this.showVideo)     { sources.push('video'); }
                if (this.showInstagram) { sources.push('instagram'); }

                return sources;
            }
        },
    }
</script>