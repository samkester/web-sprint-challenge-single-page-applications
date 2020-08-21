describe("Lambda Pizza", () => {

    describe("Environment", () => {
        it("can locate test client.", () => {
            cy.visit("http://localhost:3000/pizza");
            cy.url().should("include", "localhost");
        });
    });

    describe("Form inputs", () => {
        const nameInput = () => cy.get("input[name='name']");
        const instrInput = () => cy.get("input[name='instructions']");
        const cheeseInput = () => cy.get("input[name='topping_cheese']");
        const baconInput = () => cy.get("input[name='topping_bacon']");
        const sizeInput = () => cy.get("select[name='size']");

        it("name input can be entered to", () => {
            nameInput().type("Joe");
            nameInput().should("have.value", "Joe");
        });
        
        it("instruction input can be entered to", () => {
            instrInput().type("Joe's usual");
            instrInput().should("have.value", "Joe's usual");
        });
        
        it("cheese box can be checked", () => {
            cheeseInput().click();
            cheeseInput().should("have.checked");
        });
        
        it("bacon box can be checked", () => {
            baconInput().click();
            baconInput().should("have.checked");
        });

        it("size dropdown can be selected", () => {
            sizeInput().select("small");
            sizeInput().should("have.value", "small");
        });
    });

    describe("Form control", () => {
        const submitButton = () => cy.get("button.hero");

        it("submit button can be clicked", () => {
            submitButton().should("not.have.disabled");
            submitButton().click();
        });

        it("page switches to /review", () => {
            cy.url().should("include", "/review");
        });

        it("new order is present on the page", () => {
            cy.contains("Joe").should("exist");
        });
    });

});