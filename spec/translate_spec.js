describe("open translate", function() {
    it ("show open page", function() {
        // non angular app
        browser.ignoreSynchronization = true;

        browser.get("http://localhost:3000");
        
        element(by.id("searchinput")).clear()
        element(by.id("searchinput")).sendKeys("hallo");
        element(by.id("searchbutton")).click();
        element.all(by.css("table tbody tr td")).then( function(items) {
            expect(items[0].getText()).toEqual("hallo");
            expect(items[1].getText()).toEqual("hello");
            expect(items[2].getText()).toEqual("bon jour");
        });
    });
});

