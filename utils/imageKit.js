var ImageKit = require("imagekit");

exports.initImageKit = function()
{

var imagekit = new ImageKit({
    publicKey : process.env.PUBLICKEY_IMAGEKIT,
    privateKey : process.env.PRIVATEKEY_IMAGEKIT,
    urlEndpoint : process.env.ENDPOINTURL_IMAGEKIT
});

return imagekit;
};



// SDK initialization

// var ImageKit = require("imagekit");

// var imagekit = new ImageKit({
//     publicKey : "public_F7U5O8PGk9tlFfuKYcRplhADd80=",
//     privateKey : "private_tKlNnCivdV******************",
//     urlEndpoint : "https://ik.imagekit.io/oaxhg8qr0a"
// });






