var profile = new Vue({
    el: '#profile',
    data: {
        display: false,
        teamname: '',
        name: '',
        killstreak: 0,
        kills: 0,
        points: 0,
        deaths: 0,
        img: '',
        color: '',
        level: 0
    },
    methods: {
        GetSource(id) {
            switch (id) {
                case 0:
                    return './img/dm.png';
                case 1:
                    return './img/aztecas.png';
                case 2:
                    return './img/grove.png';
                case 3:
                    return './img/yakuza.png';
                case 4:
                    return './img/ballas.png';
                case 5:
                    return './img/vagos.png';
                case 6:
                    return './img/bratwa.png';
                case 7:
                    return './img/lcn.png';
                case 8:
                    return './img/aod.png';
            }
        },
        update(name, teamname, points, kills, deaths, killstreak, teamid, color, level) {
            this.name = name;
            this.teamname = teamname;
            this.points = points;
            this.kills = kills;
            this.deaths = deaths;
            this.killstreak = killstreak;
            this.color = color;
            this.img = this.GetSource(teamid);
            this.level = level;
        }
    },
})

// profile.update("Pavjel", "Marabunta Grande", 1, 1, 1, 1, 5, "Yellow", 10)

if ('alt' in window) {
    alt.on('updateProfile', (name, teamname, points, kills, deaths, killstreak, teamid, color, level) => {
        profile.update(name, teamname, points, kills, deaths, killstreak, teamid, color, level)
    });
    alt.on('show:profile', () => {
        profile.display = true;
    });
    alt.on('hide:profile', () => {
        profile.display = false;
    });
}