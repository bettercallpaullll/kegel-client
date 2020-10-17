var garage = new Vue({
    el: '#garage',
    data: {
        display: true,
        // vehicles: []
            vehicles: [{ id: 1, name: "hallo1" }, { id: 1, name: "hallo1" }, { id: 1, name: "hallo1" }, { id: 1, name: "hallo1" }, { id: 1, name: "hallo1" }, { id: 1, name: "hallo1" }, { id: 1, name: "hallo1" }, { id: 1, name: "hallo1" }, { id: 1, name: "hallo1" }, { id: 1, name: "hallo2" }, { id: 1, name: "hallo3" }, { id: 1, name: "hallo4" }, { id: 1, name: "hallo5" }, { id: 1, name: "hallo6" }, { id: 1, name: "hallo7" }, { id: 1, name: "hallo8" }, { id: 1, name: "hallo9" }, { id: 1, name: "hallo10" }, { id: 1, name: "hallo11" }, { id: 1, name: "hallo12" }, { id: 1, name: "hallo13" }, { id: 1, name: "hallo14" }, { id: 1, name: "hallo15" }]
    },
    methods: {
        parkOut(veh) {
            alt.emit('EmitServer', 'parkOut', veh.id);
            alt.emit("hide:garage");
            this.display = false;
        },
    }
})

if ('alt' in window) {
    alt.on('show:garage', (vehicles) => {
        garage.display = true;
        garage.vehicles = vehicles;
    });
}