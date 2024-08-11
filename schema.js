const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = require("graphql");
const axios = require("axios");

const EmployeeType = new GraphQLObjectType({
    name: "Employee",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return axios.get("http://localhost:3000/employeeData/" + args.id).then(res => res.data);
            }
        },
        employeeList: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args) {
                return axios.get("http://localhost:3000/employeeData").then(res => res.data);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                return axios.post("http://localhost:3000/employeeData", {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }).then(res => res.data);
            }
        },
        deleteEmployee: {
            type: EmployeeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return axios.delete("http://localhost:3000/employeeData/" + args.id).then(res => res.data);
            }
        },
        updateEmployee: {
            type: EmployeeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(_, args) {
                return axios.patch("http://localhost:3000/employeeData/" + args.id, args).then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });