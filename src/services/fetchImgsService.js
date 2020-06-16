const fetchImgsService = (imgIds) => {

    var prefix = "https://s3-eu-west-1.amazonaws.com/" + process.env.REACT_APP_S3_PHOTOS_BUCKET + "/WebSitePhotos/";
    var suffix = "___Source.jpg";

    var getUrls = function (imgIds) {
        if (!imgIds) {
            return;
        }
        var urls = imgIds.map(function (imgId) {
            return {
                src: prefix + imgId + suffix
            };
        });
        return urls || [];
    };

    return getUrls(imgIds);
}

module.exports = fetchImgsService;
