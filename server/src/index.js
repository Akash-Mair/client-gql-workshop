const { ApolloServer, gql } = require('apollo-server');
const { data } = require('./musician-data')


const typeDefs = gql`
    type Musician {
        id: ID!
        name: String!
        imageUrl: String
        grammyWins: String
    }


    input NewMusician {
        id: ID!
        name: String!
        imageUrl: String
        grammyWins: String
    }

    type Query {
        musicians: [Musician]!
        musician(input: ID!): Musician!
    }

    type Mutation {
        addMusician(input: NewMusician!): Musician!
    }
`

const resolvers = {
    Query: {
        musicians: (_, __, { musicians }) => musicians,
        musician: (_, { input }, { musicians }) => musicians.find(x => x.id === input)
    },
    Mutation: {
        addMusician: (_, { input }, { musicians }) => {
            musicians.push(input)
            return input
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context() {
        return { musicians: data }
    }
});

server.listen(5000).then(({ url }) => console.log(`running on ${url}`))
