const Storage = require('@google-cloud/storage');

// TODO change immediately!
const config = {
  CLOUD_BUCKET: 'test-shop.teddydevstack.com',
  PROJECT_ID: 'fancy-to-do'
}

// confirm service api
const storage = Storage({
  projectId: config.PROJECT_ID,
  keyFilename: 'fancy-to-do-91475c0a5e84.json' // TODO change immediately!
});

function storageUrl (filename) {
  return `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
}

// middleware

function googleUpload (req, res, next) {
  const bucket = storage.bucket(config.CLOUD_BUCKET)

  if (!req.file) {
    console.log('no file uploaded, skipping...');
    return next();
  }

  let userName;
  if (!req.decoded.name) {
    userName = 'etc';
  } else {
    userName = req.decoded.name;
  }

  let extension = req.file.originalname.split('.').pop();
  const destination = `${userName}/`;
  const uploadName = destination + Date.now() + 'bersama.' + extension;
  const file = bucket.file(uploadName);

  // streaming
  const stream = file.createWriteStream({
    metadata: {
      contentType : req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = uploadName;
    file.makePublic()
      .then(() => {
        console.log('upload finished');
        req.file.imgUrl = storageUrl(uploadName);
        next();
      });
  });

  stream.end(req.file.buffer);
}
