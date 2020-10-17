var login = new Vue({
    el: '#login',
    data: {
        display: false,
        loginOpen: true,
        username: '',
        notifications: [],
        discordOpen: false,
    },
    methods: {
        switchTab() {
            this.loginOpen = !this.loginOpen;
        },
        submit() {
            if (this.loginOpen) {
                alt.emit('EmitServer', "loginAttemptServer", this.username);
            } else {
                alt.emit('EmitServer', "registerAttemptServer", this.username);
            }
        },
        addMessage(mess) {
            if (this.notifications.length > 2) {
                this.notifications.shift();
            }
            this.notifications.push(mess);
        },
        toogleDiscord() {
            this.discordOpen = !this.discordOpen;
        },
    }
})

if ('alt' in window) {
    alt.on('hide:login', () => {
        login.display = false;
    });
    alt.on('login:notify', (mess) => {
        login.addMessage(mess);
    });
    alt.on('submitEnter', () => {
        if (login.display) {
            login.submit();
        }
    });
    alt.on('open:login', (n) => {
        login.display = true;
        login.loginOpen = true;
        login.username = n;
    });
    alt.on('open:register', () => {
        login.display = true;
        login.loginOpen = false;
    });
    alt.on('web:ready', (i) => {
        alt.emit("login:ready", i)
    });

}