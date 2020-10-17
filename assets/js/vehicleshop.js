var vehicleshop = new Vue({
    el: '#vehicleshop',
    data: {
        display: false,
        vehicles: [],
        classes: [],
        classOpen: true,
        currentClass: '',
        selectedVehicle: null
    },
    methods: {
        selectClass(c) {
            this.currentClass = c;
            this.classOpen = false;
        },
        back() {
            this.classOpen = true;
            this.currentClass = '';
            this.selectedVehicle = null;
        },
        selectVehicle(veh) {
            this.selectedVehicle = veh;
            alt.emit("EmitServer", "spawnVehicle", veh.hash)
        },
        close() {
            this.display = false;
            alt.emit("EmitServer", "closeCarShop");
        },
        buyVehicle(hash) {
            alt.emit("EmitServer", "buyVehicle", hash);
        }
    }
})

vehicleshop.vehicles = vehicleList;

for (var i = 0; i < vehicleList.length; i++) {
    if (!vehicleshop.classes.includes(vehicleList[i].class)) {
        vehicleshop.classes.push(vehicleList[i].class);
    }
}



if ('alt' in window) {
    alt.on('show:carshop', () => {
        vehicleshop.display = true;
    });
    alt.on('hide:carshop', () => {
        vehicleshop.display = false;
    });
}