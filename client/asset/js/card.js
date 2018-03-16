Vue.component('card-component', {
    template: `
        <div  class="card-user">
            <img :src="info.filePath" class="img-fluid" alt="">
            <div class="card-detail">
                <div class="like-photo" style="margin-bottom: 10px">
                    <button class="liked-btn display-off">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button v-on:click="count += 1" class="like-btn">
                        <i class="far fa-heart"></i>
                    </button>
                    <span v-if="count > 0" style="font-size: 12px;">
                        {{ count }}
                    </span>
                </div>
                <div class="card-bio">
                    <h4>Jonathan Joe</h4>
                </div>
                <div class="card-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero consequuntur repellendus, veritatis ratione maxime, odio, iusto
                    soluta quos labore corrupti inventore ab ullam incidunt non earum cupiditate assumenda fuga quidem.
                </div>
            </div>
        </div>
    `,
    props: ['info', 'count']
})