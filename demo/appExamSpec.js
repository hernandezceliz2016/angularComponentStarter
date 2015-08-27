(function() {
  "use strict";

	describe("Validate examComponent", function() {
	    beforeEach(function() {
	      browser.get("http://localhost:5000");
	      browser.waitForAngular();
	    });

	    it("Number expected from component", function() {
	      var firstButtonElement = element.all(by.css(".btn")).get(0);	      
	      expect(firstButtonElement.getText()).toBe('10');      
	    });   

	    it("Same number for all button", function() {	    	
	      var firstButtonElement = element.all(by.css(".btn")).get(0);	      
	      var secondButtonElement = element.all(by.css(".btn")).get(1);
	      var thirdButtonElement = element.all(by.css(".btn")).get(2);
	      var forthButtonElement = element.all(by.css(".btn")).get(3);

	      firstButtonElement.click();
	      var expectedValue = firstButtonElement.getText();
	      expect(firstButtonElement.getText()).toBe(expectedValue);
	      expect(secondButtonElement.getText()).toBe(expectedValue);
	      expect(thirdButtonElement.getText()).toBe(expectedValue);
	      expect(forthButtonElement.getText()).toBe(expectedValue);
	    }); 

	    it("Same number for all button, Many clicks", function() {	
	      var repeatNumber = 2;    	
	      var firstButtonElement = element.all(by.css(".btn")).get(0);	      
	      var secondButtonElement = element.all(by.css(".btn")).get(1);
	      var thirdButtonElement = element.all(by.css(".btn")).get(2);
	      var forthButtonElement = element.all(by.css(".btn")).get(3);

	      var expectedValue='';

	      for (var i=0;i<repeatNumber;i++)
	      {
	      	firstButtonElement.click();
	      	expectedValue = firstButtonElement.getText();
	      	expect(firstButtonElement.getText()).toBe(expectedValue);
	      	expect(secondButtonElement.getText()).toBe(expectedValue);
	      	expect(thirdButtonElement.getText()).toBe(expectedValue);
	      	expect(forthButtonElement.getText()).toBe(expectedValue);
	      }	      
	    }); 

	    it("Ramdom click", function() {	
	      var repeatNumber = 3;    	
	      var buttonElements = element.all(by.css(".btn"));

	      var expectedValue='';

	      for (var i=0;i<repeatNumber;i++)
	      {
	      	buttonElements.get(i).click();
	      	expectedValue = buttonElements.get(i).getText();
	      	expect(buttonElements.get(i).getText()).toBe(expectedValue);
	      	expect(buttonElements.get(i).getText()).toBe(expectedValue);
	      	expect(buttonElements.get(i).getText()).toBe(expectedValue);
	      	expect(buttonElements.get(i).getText()).toBe(expectedValue);
	      }	      
	    }); 

	  });

})();