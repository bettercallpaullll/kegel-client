var adminMessage = new Vue({
    el: '#adminMessage',
    data: {
        display: true,
        messages: []
    },
    methods: {
        sendMessage(mess) {
            this.messages.push(mess);
            setTimeout(() => {
                this.messages.shift(0);
            }, 5000)
        }
    }
})

// adminMessage.sendMessage("dd sadddddddddddddddddddddd ddddddddddd ddddddddddddd dddddddddddddd ba")

if ('alt' in window) {
    alt.on('send:adminMessage', (mess) => {
        adminMessage.sendMessage(mess);
    });
}