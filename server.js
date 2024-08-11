const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./schema.js");
const app = express();



app.use("/graphql", graphqlHTTP({
    schema: graphQlSchema,
    graphiql: true
}));



// Server ayağa kaldırıldı.
app.listen(4000, () => {
    console.log("Server 4000 Portunda Çalıştı.");
});

