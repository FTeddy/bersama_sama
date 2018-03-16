const request = axios.create({
    baseURL: 'http://bersama.teddydevstack.com',
})

new Vue ({
    el: '#app-vue',
    data: {
        data: null,
        dataLS: localStorage.getItem('facebookId'),
        dataJWT: localStorage.getItem('token'),
        token: localStorage.getItem('token'),
        counter: 0,
        image: null,
        fileUpload: [],
        caption: null
    },
    mounted: function() {
        this.getData()
    },
    methods: {
        getToken: function () {
            return localStorage.getItem('token')
        },
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
        },
        onFileChange: function (e) {
            const files = e.target.files || e.dataTransfer.files
            this.fileUpload = files
            if (files.length > 0) {
              return this.createImage(files[0])
            }
        },
        createImage: function (file) {
            const image = new Image()
            const reader = new FileReader()
            const vm = this

            reader.onload = (e) => {
              vm.image = e.target.result
            }
            reader.readAsDataURL(file)
        },
        removeImage: function (e) {
            this.image = ''
        },
        uploadImage: function () {
            // console.log(this.fileUpload[0]);
            let data = new FormData()
            data.append('image', this.fileUpload[0])
            data.append('token', this.getToken())
            data.append('description', this.caption)
            data.append('facebookId', this.dataLS)
            request.post(`http://bersama.teddydevstack.com/file/create/${this.dataLS}`, data)
            .then(response => {
              console.log(response);
            //   request.get(`http://bersama.teddydevstack.com/`)
            })
        }
    }
})
