var clothesSelect = new Vue({
    el: '#clothesSelect',
    data: {
        display: false,
        component: 0,
        drawable: 0,
        texture: 0
    },
    methods: {
        Drawable() {
            alt.emit('clothesSelectAdd', this.component, this.drawable, this.texture);
        },
        Texture() {
            alt.emit('clothesSelectAdd', this.component, this.drawable, this.texture);
        },
        Close() {
            this.display = false;
            alt.emit('closeClothesSelect');
        }
    },
})

if ('alt' in window) {
    alt.on('show:clothesSelect', () => {
        clothesSelect.display = true;
    });
}