describe("API - Interactions", () => {
    it("shows data from api in first card", () => {
        cy.intercept("GET", "/api/albums", {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    name: "Mellon Collie And The Infinite Sadness",
                    author_name: "Zach Bryan"
                }
            ]
        }).as("getAlbums");
        cy.visit("/");
        cy.wait("@getAlbums");
        cy.contains("Mellon Collie And The Infinite Sadness").should("be.visible");
    });
    it("shows error message", () => {
        cy.intercept("GET", "/api/albums", {
            statusCode: 500,
            body: [{}]
        }).as("getAlbums");
        cy.visit("/");
        cy.wait("@getAlbums");
        cy.get('[data-cy="error"]').should("be.visible");
    });
    it("shows search results", () => {
        cy.intercept("GET", "/api/search/a", {
            statusCode: 200,
            body: {
                songs: [
                    {
                        id: 3,
                        name: "Long Cool Woman in a Black Dress",
                        album_name: "Love Sick",
                        author_name: "Zach Bryan"
                    }
                ],
                albums: [
                    {
                        id: 1,
                        name: "Mellon Collie And The Infinite Sadness",
                        release_date: 1737576113404,
                        author_name: "Zach Bryan",
                        author_id: 1
                    }
                ],
                authors: [
                    {
                        id: 1,
                        name: "Zach Bryan",
                        bio: "Aequitas absens textus adaugeo debilito repellat correptius quae magni. Bardus blanditiis tristis virgo tantum tego suus."
                    }
                ]
            }
        }).as("getSearchResults");
        cy.visit("/search?q=a");
        cy.wait("@getSearchResults");
        cy.contains("Long Cool Woman in a Black Dress").should("be.visible");
        cy.contains("Mellon Collie And The Infinite Sadness").should("be.visible");
        cy.contains("Zach Bryan").should("be.visible");
    });
    it("displays text 'loading' and then dissapears", () => {
        cy.visit("/");
        cy.intercept("GET", "/api/albums", {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    name: "Mellon Collie And The Infinite Sadness",
                    author_name: "Zach Bryan"
                }
            ]
        }).as("getAlbums");
        cy.get('[data-cy="loading"]').should("be.visible");
        cy.clock();
        cy.tick(5000);
        cy.get('[data-cy="loading"]').should("not.exist");
        cy.wait("@getAlbums");
    });
});
