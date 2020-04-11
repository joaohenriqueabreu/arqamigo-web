export default {
    state: {
        apiLoaded: true,
        showMenu: false,
        message: undefined,
    },
    mutations: {
        start_api(state) {
            state.apiLoaded = false;
        },
        api_loaded(state) {
            state.apiLoaded = true;
        },
        toggle_menu(state) {
            state.showMenu = !state.showMenu;
        },
        close_menu(state) {
            state.showMenu = false;
        },
        set_message(state, message) {
            state.message = message;      
        },
        show_message(state) {
            setTimeout(() => state.message = undefined, 5000);      
        },
    },
    actions: {
        toggleMenu({ commit }) {
            commit('toggle_menu');
          },
          closeMenu({ commit }) {
            commit('close_menu');
          },
    },
    getters: {
        isApiLoaded: state => state.apiLoaded,
        isMenuOpened: state => state.showMenu,
        hasMessage: state => state.message !== undefined,
        getMessage: state => state.message,
    }
}