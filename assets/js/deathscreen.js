var deathscreen = new Vue({
    el: '#deathscreen',
    data: {
        display: false,
        killer: "",
        player: ""
    },
    methods: {
        triggerDeathScreen(name) {
            this.killer = name;
            this.display = true;
        },
        clearDeathScreen() {
            this.display = false;
            this.killer = "";
        }
    },
})

if ('alt' in window) {
    alt.on('trigger:deathscreen', (name, duration) => {
        deathscreen.triggerDeathScreen(name, duration)
    });
    alt.on('clear:deathscreen', () => {
        deathscreen.clearDeathScreen()
    });
}