jest.mock('./index'); // This line is important!
const {getpicture} = require('./index');
import "babel-polyfill"

// here I wonted work with asinc function and mokcs in jest
//just simple example
test('should return some data',() => {
    getpicture('washington').then(res=>{
      expect(res[0].webformatURL).stringMatching(/^https:/)
  });

});