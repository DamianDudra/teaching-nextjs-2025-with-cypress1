describe("Album Catalog - Interactions", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("looks for songs when searching via search bar", () => {
        const searchTerm = "test";

        cy.get('[data-cy="search-input"]').type(searchTerm);
        cy.contains("Search").click();

        cy.url().should("include", `/search?q=${searchTerm}`);
    });

    it("navigates to the first album detail", () => {
        cy.get('[data-cy="album-detail-button"]').first().click();

        cy.url().should("include", "/album/1");
    });

    it("navigates to home page after clicking on Spotify logo", () => {
        cy.get("[data-cy=title]").click();

        cy.url().should("include", "/");
    });

    it("preserves search term in input after search", () => {
        const searchTerm = "test song";

        cy.get('[data-cy="search-input"]').type(searchTerm);
        cy.contains("Search").click();

        cy.get('[data-cy="search-input"]').should("have.value", searchTerm);
    });

    it("displays all three sections in search results", () => {
        const searchTerm = "a";

        cy.get('[data-cy="search-input"]').type(searchTerm);
        cy.contains("Search").click();

        cy.get('[data-cy="songs-section-title"]').should("be.visible");
        cy.get('[data-cy="albums-section-title"]').should("be.visible");
        cy.get('[data-cy="authors-section-title"]').should("be.visible");
    });
});
