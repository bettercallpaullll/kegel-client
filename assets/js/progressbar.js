var progressbar = new Vue({
    el: '#progressbar',
    data: {
        display: false,
        progress: 0
    },
    methods: {
        create() {
            this.display = true;
            startTime();
        }
    }
})

function startTime(){
    setTimeout(() => {
        progressbar.progress += 1;
        if(progressbar.progress == 100){
            setTimeout(() => {
                progressbar.display = false;
                progressbar.progress = 0;
            }, 200)           
            return;
        }
        startTime();
    }, 50)
}


// progressbar.create();

if ('alt' in window) {
    alt.on('open:progressbar', () => {
        progressbar.create();
    });
}