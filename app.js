const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const {GraphQLObjectType,GraphQLInt,GraphQLString,GraphQLBoolean,GraphQLSchema,GraphQLList} = require('graphql');

const seedData=[
    {id: 1, language:'phython',loved: true },
    {id: 2, language:'javascript',loved: true },
    {id: 3, language:'scala',loved: true }
]

//schema -->Basiclly  a modules of data that can be fetched through graphql server.
//resolver--> basically tell graphql server how to populate each schema wth data


const languageType = new GraphQLObjectType({
name: 'Language',
description: 'ProgrammingLanguage',
fields:{
    id:{
        type:GraphQLInt
    },
    language:{
        type:GraphQLString
    },
    loved:{
        type:GraphQLBoolean
    }
}

})

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'this is root query',
    fields:{
        
        languages:{
            type:GraphQLList(languageType),
            resolve: () => seedData
        },
        language:{
            type:languageType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(_,{id}) => seedData.find(language => language.id ==id)
        }
    }
    
    })




    const rootMutation = new GraphQLObjectType({
        name: 'RootMutation',
        description: 'this is root Mutation',
        fields:{
            
            languages:{
                type:GraphQLList(languageType),
                resolve: () => seedData
            },
            language:{
                type:languageType,
                args:{
                    lang:{type:GraphQLString},
                    loved:{type:GraphQLBoolean}
                },
                resolve:(_,{lang,loved}) => {
                    const newLanguage ={
                        id: seedData.length+1,language:lang,loved:loved}
                        seedData.push(newLanguage)
                        return newLanguage
                    }
                    }
                }
            
        })
        
        




    const schema = new GraphQLSchema({query:rootQuery,mutation:rootMutation}) 
    app.use('/graphql',graphqlHTTP({
        schema,
        graphiql:true
    }))                      
    //import graphql http
    // graphql schema--> can add resolver to it.
    // build schema --> cannot add resolver to it.
    const PORT = 3001
    
    app.listen(PORT,()=> {
        console.log('Listening on port ${PORT}🚀')
    })