var config = {
    useHttps: false,
    port: 3000,
    //multer config
    multer: {
        dest: "tmp/uploads/"
    },
    https: {
        cert: "certificates/com.server.crt",
        key: "certificates/com.server.key",
        passphrase: "mysupersecretpassword"
    }
};

module.exports = config;
