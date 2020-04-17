import Media            from '@/models/Media';
import MediasCollection from '@/collections/MediasCollection';

export default {
    namespaced: true,
    state: {
        media:  new Media(),
        medias: new MediasCollection(),
    },
    mutations: {
        set_medias(state, medias) {
            state.medias = medias;
        },
        upload_media(state, media) {
            state.medias.push(media);
        }, 
        remove_media(state, index) {      
            state.medias.splice(index, 1);      
        },
    },
    actions: {
        uploadMedia({ commit }, media) {
          commit('upload_media', media)
        },
        removeMedia({ commit }, index) {      
          commit('remove_media', index);
        },
        setMedias({commit}, mediasData) {
          commit('set_medias', mediasData);
        },
        clearMedias({commit}){
          commit('set_medias', []);
        },
    },
    getters: {
        hasUploadedMedias: state => state.medias.length > 0,
    getUploadedMedias: state => state.medias,
    }
}