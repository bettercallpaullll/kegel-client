var app = new Vue({
    el: '#teamselect',
    data: {
        display: false,
        selectedTeam: 1,
        teams: [],
        dmteams: [],
        players: [],
        categoryId: 1,
        currentPlayer: "",
        rounds: 10,
        teamOpen: true
    },
    methods: {
        modeSelect(m) {
            if (m == "duell") {
                this.teamOpen = false;
            }
            if (m == "team") {
                this.teamOpen = true;
            }
        },
        selectTeam(id, cat) {
            this.categoryId = cat;
            this.selectedTeam = id;
            if (this.categoryId == 1) {
                alt.emit('defaultTeamCloth', this.selectedTeam);
            } else {
                alt.emit('defaultDmCloth');
            }
        },
        submit() {
            if (this.categoryId == 1) {
                alt.emit('EmitServer', 'joinTeam', this.selectedTeam);
            } else if (this.categoryId == 2) {
                alt.emit('EmitServer', 'joinDeathmatch', this.selectedTeam);
            }
            alt.emit("close:teamselect");
        },
        selectPlayer(player) {
            this.currentPlayer = player;
        },
        challengeplayer() {
            if (this.rounds == 0) {
                return;
            }
            alt.emit("EmitServer", "Duell", this.currentPlayer, Number(this.rounds));
        }
    },
})

if ('alt' in window) {
    alt.on('show:teamselect', (team, dm) => {
        app.display = true;
        app.teams = team;
        app.dmteams = dm;
        app.selectedTeam = 1;
        app.categoryId = 1;
    });
    alt.on('hide:teamselect', () => {
        app.display = false;
    });
    alt.on('updatePlayers', (players) => {
        app.players = players;
    });


}