jest.mock('./index'); // This line is important!

const {getpicture} = require('./index');

import "babel-polyfill"


// here I wonted work with asinc function and mokcs in jest
//just simple example
test('should return some data',() => {

    getpicture('washington').then(res=>{

      expect(res.hits[0].webformatURL).toEqual('https://pixabay.com/get/57e1d6414f55af14f1dc84609629307f1136dde75a4c704c7c2a79d79345cc5a_640.jpg');

      expect(res.api_url).toEqual(expect.stringContaining('washington'));

  });

});