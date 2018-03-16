var request = axios.create({
    baseURL: 'http://localhost:3000',
})

new Vue ({
    el: '#app-vue',
    data: {
        keydata: 'asda',
        data: null
    },
    mounted: function() {
        this.getData()
    },
    methods: {
        getData: function () {  
            const app = this
            request.get('/file')
            .then(function (response) {
                app.data = response.data.data[0].filePath
                console.log(response, '-----')
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
})


