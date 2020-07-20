
async function  getpicture(data){

    let test_resp = {"total":2,"totalHits":2,"hits":[{"id":1132573,"pageURL":"https://pixabay.com/photos/library-books-floors-stairs-school-1132573/","type":"photo","tags":"library, books, floors","previewURL":"https://cdn.pixabay.com/photo/2016/01/10/21/35/library-1132573_150.jpg","previewWidth":150,"previewHeight":99,"webformatURL":"https://pixabay.com/get/57e1d6414f55af14f1dc84609629307f1136dde75a4c704c7c2a79d79345cc5a_640.jpg","webformatWidth":640,"webformatHeight":426,"largeImageURL":"https://pixabay.com/get/57e1d6414f55af14f6da8c7dda793679143bd7e651586c4870267ed69449cd51ba_1280.jpg","imageWidth":4608,"imageHeight":3072,"imageSize":2971766,"views":5869,"downloads":1955,"favorites":31,"likes":21,"comments":1,"user_id":624267,"user":"terimakasih0","userImageURL":"https://cdn.pixabay.com/user/2017/07/23/09-13-17-910_250x250.jpg"},{"id":3324023,"pageURL":"https://pixabay.com/photos/literature-book-wisdom-library-3324023/","type":"photo","tags":"literature, book, wisdom","previewURL":"https://cdn.pixabay.com/photo/2018/04/16/09/30/literature-3324023_150.jpg","previewWidth":150,"previewHeight":99,"webformatURL":"https://pixabay.com/get/55e3d7474a50af14f1dc84609629307f1136dde75a4c704c7c2a79d79345cc5a_640.jpg","webformatWidth":640,"webformatHeight":426,"largeImageURL":"https://pixabay.com/get/55e3d7474a50af14f6da8c7dda793679143bd7e651586c4870267ed69449cd51ba_1280.jpg","imageWidth":6000,"imageHeight":4000,"imageSize":5904076,"views":4755,"downloads":1893,"favorites":18,"likes":12,"comments":0,"user_id":7677369,"user":"ThorstenF","userImageURL":"https://cdn.pixabay.com/user/2019/04/18/17-14-25-336_250x250.jpg"}]};

    let pixabay = `https://pixabay.com/api/?key=e7c51829505e758d2a95066eb&q=${data}&category=places&image_type=photo`;

    if (data){

    let pixabay_req = test_resp;

    pixabay_req['api_url'] = pixabay;

    return Promise.resolve(pixabay_req);

    }
    else{

      return Promise.resolve('error');
    }

}

exports.getpicture = getpicture;