const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql'); // take incoming request and funel them through graphql query-parser and automatically forward/route them to right resolvers 
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

//	query: Fetching data
//	mutation: create, update, delete data
app.use('/graphql', graphqlHttp({
	schema: buildSchema(`
		type RootQuery {
			events: [String!]!
		}
		type RootMutation {
			createEvent(name: String): String
		}

		schema {
			query: RootQuery
			mutation: RootMutation
		}
	`),
	rootValue: {
		events: () => {
			return ['Event A', 'Event B', 'Event C']
		},
		createEvent: (args) => {
			const eventName = args.name;
			return eventName;
		}
	},
	graphiql: true
}));

app.listen(3000, () => console.log('Running on PORT 3000'));
