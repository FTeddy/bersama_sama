// const uploadfiles = document.querySelector('#fileinput');
// uploadfiles.addEventListener('change', function () {
//     const files = this.files;
//     for(const i=0; i<files.length; i++){
//         previewImage(this.files[i]);
//     }

// }, false);


// function previewImage(file) {
//   const galleryId = "gallery";

//   const gallery = document.getElementById(galleryId);
//   const imageType = /image.*/;

//   if (!file.type.match(imageType)) {
//       throw "File Type must be an image";
//   }

//   const thumb = document.createElement("div");
//   thumb.classList.add('thumbnail'); // Add the class thumbnail to the created div

//   const img = document.createElement("img");
//   img.file = file;
//   thumb.appendChild(img);
//   gallery.appendChild(thumb);

//   // Using FileReader to display the image content
//   const reader = new FileReader();
//   reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
//   reader.readAsDataURL(file);
// }

methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      this.fileUpload = files
      if (files.length > 0) {
        return this.createImage(files[0])
      }
    },
    createImage (file) {
      var image = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage (e) {
      this.image = ''
      this.min = null
      this.max = null
      this.cardData = []
    },
    uploadImage () {
      // console.log(this.fileUpload[0]);
      let data = new FormData()
      data.append('image', this.fileUpload[0])
      axios.post('http://35.186.155.38:3000/images', data)
      .then(response => {
        console.log(response.data.foodName, 'hoi');
        axios.get(`http://35.186.155.38:3000/walmart/search?q=${response.data.foodName}`)