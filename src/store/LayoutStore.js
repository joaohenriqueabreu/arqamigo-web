export default {
    namespaced: true,
    state: {
        navbarStyle:    '',
        containerStyle: 'container',
        pageSubtitle:   '',
    },
    mutations: {
        set_page_subtitle(state, subtitle) {
            state.pageSubtitle = subtitle;
        },
        change_navbar_style(state, style) {
            state.navbarStyle = style;
        },
        change_container_style(state, style) {
            state.containerStyle = style;
        },
    },
    actions: {
        setPageSubtitle({ commit }, subtitle) {
            commit('set_page_subtitle', subtitle);
          },
          changeNavbarStyle({ commit }, style) {
            commit('change_navbar_style', style);
          },
          changeContainerStyle({ commit }, style) {
            commit('change_container_style', style);
          },
    },
    getters: {
        hasPageSubtitle: state => state.pageSubtitle !== undefined && state.pageSubtitle.length > 0,
    getPageSubtitle: state => state.pageSubtitle,  
    getNavbarStyle: state => state.navbarStyle, 
    getContainerStyle: state => state.containerStyle,
    }
}