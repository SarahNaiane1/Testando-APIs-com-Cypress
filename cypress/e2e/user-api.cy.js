context("Cypress APIs", () => {
  const uniqueEmail = `user_${Date.now()}@example.com`;
  let newUser;
  let userId; // Declaração de userId

  before(() => {
    // Limpa a coleção de usuários antes dos testes
    cy.request({
      url: "http://localhost:5000/api/admin/drop-collection",
      method: "POST",
      body: { collection: "user" },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(response.body);
    });
  });

  beforeEach(() => {
    // Define o novo usuário antes de cada teste
    newUser = {
      name: "John Doe",
      email: uniqueEmail,
      dateOfBirth: "1985-08-20",
      address: "456 Another St, Springfield, IL",
    };
  });

  it("should register a user successfully", () => {
    cy.request({
      url: "http://localhost:5000/api/user",
      method: "POST",
      body: newUser,
    }).then((response) => {
      expect(response.status).to.eql(201);
      expect(response.body.name).to.eql(newUser.name);
      expect(response.body.email).to.eql(newUser.email);
      expect(
        new Date(response.body.dateOfBirth).toISOString().split("T")[0]
      ).to.eql(newUser.dateOfBirth);
      expect(response.body.address).to.eql(newUser.address);
      userId = response.body._id; // Armazena o userId para uso posterior
    });
  });

  it("should not register a user with duplicated email", () => {
    cy.request({
      url: "http://localhost:5000/api/user",
      method: "POST",
      body: newUser,
      failOnStatusCode: false, // Permite que o teste continue mesmo com erro
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.error).to.eql("Email already in use");
    });
  });

  it("should get a list of users", () => {
    cy.request({
      url: "http://localhost:5000/api/user",
      method: "GET",
    }).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("should get a user by ID", () => {
    cy.request({
      url: `http://localhost:5000/api/user/${userId}`,
      method: "GET",
    }).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body._id).to.eql(userId);
      expect(response.body.name).to.eql("John Doe");
      expect(response.body.email).to.eql(uniqueEmail);
    });
  });

  it("should update a user's details successfully", () => {
    const updatedUser = {
      name: "Jane Doe",
      email: `updated_${uniqueEmail}`,
      dateOfBirth: "1990-01-01",
      address: "789 Updated St, Springfield, IL",
    };

    cy.request({
      url: `http://localhost:5000/api/user/${userId}`,
      method: "PUT",
      body: updatedUser,
    }).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body.name).to.eql(updatedUser.name);
      expect(response.body.email).to.eql(updatedUser.email);
      expect(
        new Date(response.body.dateOfBirth).toISOString().split("T")[0]
      ).to.eql(updatedUser.dateOfBirth);
      expect(response.body.address).to.eql(updatedUser.address);
    });
  });
  it("should delete a user by ID", () => {
    cy.request({
      url: `http://localhost:5000/api/user/${userId}`,
      method: "DELETE",
    }).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body.message).to.eql("User removed successfully");
    });

    // Verifica se o usuário foi realmente removido
    cy.request({
      url: `http://localhost:5000/api/user/${userId}`,
      method: "GET",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(404);
      expect(response.body.error).to.eql("User not found");
    });
  });

  it("Not allow updating the deleted user", () => {
    cy.request({
      url: `http://localhost:5000/api/user/${userId}`,
      method: "PUT",
      body: newUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(404);
      expect(response.body.error).to.eql("User not found");
    });
  });
  it("Recreate a user ", () => {
    cy.request({
      url: "http://localhost:5000/api/user",
      method: "POST",
      body: newUser,
    }).then((response) => {
      expect(response.status).to.eql(201);
      expect(response.body.name).to.eql(newUser.name);
      expect(response.body.email).to.eql(newUser.email);
      expect(
        new Date(response.body.dateOfBirth).toISOString().split("T")[0]
      ).to.eql(newUser.dateOfBirth);
      expect(response.body.address).to.eql(newUser.address);
      userId = response.body._id;
    });
  });

  it("should not register a user with incomplete data", () => {
    cy.request({
      url: "http://localhost:5000/api/user",
      method: 'POST',
      body: {
        email: uniqueEmail,
        dateOfBirth: "1985-08-20",
        address: "456 Another St, Springfield, IL",
      },
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.error).to.eql('All fields are mandatory');
    });

    cy.request({
      url: "http://localhost:5000/api/user",
      method: 'POST',
      body: {
        name: "John Doe",
        dateOfBirth: "1985-08-20",
        address: "456 Another St, Springfield, IL",
      },
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.error).to.eql('All fields are mandatory');
    });

    cy.request({
      url: "http://localhost:5000/api/user",
      method: 'POST',
      body: {
        name: "John Doe",
        email: uniqueEmail,
        address: "456 Another St, Springfield, IL",
      },
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.error).to.eql('All fields are mandatory');
    });

    cy.request({
      url: "http://localhost:5000/api/user",
      method: 'POST',
      body: {
        name: "John Doe",
        email: uniqueEmail,
        dateOfBirth: "1985-08-20",
      },
      failOnStatusCode: false, 
    }).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body.error).to.eql('All fields are mandatory');
    });
  });
});
