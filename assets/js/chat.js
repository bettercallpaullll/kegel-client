var chat = new Vue({
    el: '#chat',
    data: {
        display: false,
        messages: [],
        input: '',
        enabled: true,
        lastMessages: [],
        lastMessage: 0,
        commandArgs: []
    },
    methods: {
        clearInput() {
            this.input = '';
        },
        enableInput() {
            if (this.display) {
                this.enabled = true;
                this.clearInput();
                this.$nextTick(() => this.$refs.chat_input.focus())
                this.$refs.chat_input.focus();
            }
        },
        disableInput() {
            if (this.display) {
                this.enabled = false;
                this.clearInput();
            }
        },
        sendMessage() {
            if (this.input == "") {
                return;
            } else if (this.input.charAt(0) == "/") {
                var baseString = this.input;
                var argList = baseString.split(" ");
                var command = argList[0].substr(1);

                for (i = 1; i < baseString.split(" ").length; i++) {
                    this.commandArgs.push(argList[i]);
                }

                alt.emit('EmitServer', command, this.commandArgs);
                // alt.emit('EmitServer', command, ...this.commandArgs);
                // alt.emit("log", ...this.commandArgs);
                // alt.emit("log", this.commandArgs);
                this.commandArgs = [];
            } else {
                alt.emit('messageToServer', this.input);
            }
            this.input = '';
            this.lastMessages.push(this.input);
            if (this.messages.length >= 6) {
                this.messages.shift();
            }
        },
        addMessage(msg) {
            this.messages.push(msg);
            if (this.messages.length >= 6) {
                this.messages.shift();
            }
        },
        lastMessageUp() {
            if (this.lastMessage > this.lastMessages.length) {
                this.lastMessage = 0;
            } else {
                this.lastMessage++;
            }
            this.input = this.lastMessages[this.lastMessage];
        },
        lastMessageDown() {
            if (this.lastMessage < this.lastMessages.length) {
                this.lastMessage = this.lastMessages.length;
            } else {
                this.lastMessage--;
            }
            this.input = this.lastMessages[this.lastMessage];
        }
    },
    mounted() {
        // this.disableInput();
        this.enableInput();
    }
})

// chat.addMessage("iashsd")
// chat.addMessage("iashsd")
// chat.addMessage("iashsd")
// chat.addMessage("iashsd")
// chat.addMessage("iashsd")
// chat.addMessage("iashsd")
// chat.addMessage("iashsd")
// chat.addMessage("iashsd")
// chat.addMessage("last")


if ('alt' in window) {
    alt.on('show:chat', () => {
        chat.display = true;
        chat.disableInput();
    });
    alt.on('hide:chat', () => {
        chat.display = false;
    });
    alt.on('clearInput', chat.clearInput);
    alt.on('enableInput', () => {
        chat.enableInput();
        chat.$refs.chat_input.focus();
    });
    alt.on('disableInput', chat.disableInput);
    alt.on('sendMessage', chat.sendMessage);
    alt.on('addMessage', (message) => {
        chat.addMessage(message);
    });
    alt.on('lastMessageUp', chat.lastMessageUp);
    alt.on('lastMessageDown', chat.lastMessageDown);
}