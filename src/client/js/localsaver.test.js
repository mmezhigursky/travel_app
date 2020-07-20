import { RemoveTool } from "./localsaver.js";

  describe("This method has to remove daemandit element", () => {
    
    test("sould return array with one el", () => {
        
      const input = [{id:1},{id:2}];

      const output = [{id:2}];

      expect(RemoveTool(input, 1)).toEqual(output);

      expect(RemoveTool(input, 3)).toEqual(undefined);

      expect(RemoveTool()).toEqual(undefined);

    });
  
  });