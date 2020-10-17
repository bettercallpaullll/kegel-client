var help = new Vue({
    el: '#help',
    data: {
        display: false,
    },
    methods: {

    }
})


if ('alt' in window) {
    alt.on('show:help', () => {
        help.display = true;
    });
    alt.on('hide:help', () => {
        help.display = false;
    });
}