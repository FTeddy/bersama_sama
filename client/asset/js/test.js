var request = axios.create({
    baseURL: 'http://localhost:3000',
})

new Vue ({
    el: '#app-vue',
    data: {
        data: null,
        dataLS: localStorage.getItem('facebookId'),
        dataJWT: localStorage.getItem('token'),
        counter: 0
    },
    mounted: function() {
        this.getData()
    },
    methods: {
        getData: function () { 
            const app = this
            console.log(this.dataJWT)
            request.get('/file')
            .then(function (response) {
                console.log(response)
                // respons
                app.data = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
})


