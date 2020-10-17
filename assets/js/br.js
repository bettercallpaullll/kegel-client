var br = new Vue({
    el: '#br',
    data: {
        display: false,
        currentPlayer: "",
        currentPlayerId: 0
    },
    methods: {
        nextPlayer() {
            alt.emit("EmitServer", "NextSpec", this.currentPlayer, this.currentPlayerId)
        },
        previousPlayer() {
            alt.emit("EmitServer", "PreviousSpec", this.currentPlayer, this.currentPlayerId)
        },
        endSpec() {
            alt.emit("endBrSpec");
            this.display = false;
        }
    }
})

if ('alt' in window) {
    alt.on('brSpec', (name, id) => {
        br.display = true;
        br.currentPlayer = name;
        br.currentPlayerId = id;
    });
}