Vue.component('card-component', {
    template: `
        <div  class="card-user">
            <img :src="info.filePath" class="img-fluid" alt="">
            <div class="card-detail">



                <div class="row">
                    <div class="col-6">
                        <div class="like-photo" style="margin-bottom: 10px">

                                <i class="fas fa-heart display-off"></i>
                                <button style="background-color: #FFF !important; border: none !important; " v-on:click="likePicture(info.likes, info._id)">
                                    <i class="far fa-heart"></i>
                                </button>


                                <span v-if="countLike > 0" style="font-size:12px;">
                                    {{ countLike }}
                                </span>

                            <span v-if="count > 0" style="font-size: 12px;">

                            </span>
                        </div>
                    </div>
                </div>

                <div class="card-bio">
                    <div class="row" style="margin-bottom: 20px; margin-top: 10px;">
                        <div class="col-2">
                            <img :src="info.user.profilImg " class="rounded-circle img-fluid" alt="">
                        </div>
                        <div class="col-6 username">
                            <h4>{{ info.user.username }}</h4>
                        </div>
                    </div>

                </div>

                <div class="card-desc">
                    {{ info.description }}
                </div>
                <div class="dateFromNow">
                    {{ info.dateFromNow }}
                </div>
                <br>
                <hr>
            </div>
        </div>
    `,
    props: ['info', 'count'],
    data: function() {
        return {
            likeCount: 0
        }
    },
    methods: {
        likePicture: function (liked, img_id) {

            let token = localStorage.getItem('token')
            let fbId = localStorage.getItem('facebookId');

            console.log('lol')

            if (liked.length === 0) {
                console.log('asda')
                axios.put(`http://bersama.teddydevstack.com/file/like/${img_id}`, {
                    token: token
                })
                .then(data => {
                    window.location.href = 'index.html'
                    console.log('sucess')
                })
                .catch(err => {
                    console.log(err);
                })
            } else {

                liked.map( (data,i) => {
                    console.log('asdajks')
                    if (data.facebookId !== fbId) {
                        axios.put(`http://bersama.teddydevstack.com/file/like/${img_id}`, {
                            token: token
                        })
                        .then(data => {
                            window.location.href = 'index.html'
                            console.log('sucess')
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                })

            }

        },

    },
    computed: {
        countLike: function () {
            let count = this.info.likes.length
            return count
        }
    }
})
