var request = axios.create({
    baseURL: 'http://localhost:3000',
})

new Vue ({
    el: '#app-vue',
    data: {
        data: null,
        dataLS: localStorage.getItem('facebookId'),
        counter: 0
    },
    mounted: function() {
        this.getData()
    },
    methods: {
        getData: function () { 
            const app = this
            request.get('/file')
            .then(function (response) {
                app.data = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
})


