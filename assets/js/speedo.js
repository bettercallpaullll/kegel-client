var speedo = new Vue({
    el: '#speedo',
    data: {
        display: false,
        speed: 0
    },
    methods: {
        update(s) {
            this.speed = s;
        }
    },
})

if ('alt' in window) {
    alt.on('show:speedo', () => {
        speedo.display = true;
    });
    alt.on('hide:speedo', () => {
        speedo.display = false;
    });
    alt.on('update', (speed) => {
        speedo.update(speed);
    });
}