var killfeed = new Vue({
    el: '#killfeed',
    data: {
        display: false,
        name: '',
        damage: [],
        showFeed: false
    },
    methods: {
        showDamage(damage, color) {
            this.damage.unshift({ d: damage, c: color });
            removeDamage();
        },
        showKillFeed(name) {
            this.showFeed = true;
            this.name = name;
            clearKillFeed();
        }
    }
})

clearKillFeed = function() {
    setTimeout(() => {
        killfeed.name = "";
        killfeed.showFeed = false;
    }, 3000)
}

// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }

// var count = 0;

// window.setInterval(() => {
//     count++;
//     if (getRandomInt(2) == 0) {
//         killfeed.showDamage(count, "green")
//     } else {
//         killfeed.showDamage(count, "blue")
//     }
// }, 1000);

removeDamage = function() {
    setTimeout(() => {
        killfeed.damage.pop();
    }, 500);
}

if ('alt' in window) {
    alt.on('hide:killfeed', () => {
        killfeed.display = false;
    });
    alt.on('show:killfeed', () => {
        killfeed.display = true;
    });
    alt.on('damage:Armor', (damage) => {
        killfeed.showDamage(damage, "blue");
    });
    alt.on('damage:Health', (damage) => {
        killfeed.showDamage(damage, "green");
    });
    alt.on('killFeed', (name) => {
        killfeed.showKillFeed(name)
    });
}