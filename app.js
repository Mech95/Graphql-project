const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const {GraphQLObjectType,GraphQLInt,GraphQLString,GraphQLBoolean,GraphQLSchema,GraphQLList} = require('graphql');

const seedData=[
    {id: 1, subject:'phython',passed: true,year:1995 },
    {id: 2, subject:'javascript',passed: true,year:2000 },
    {id: 3, subject:'scala',passed: true,year:1997 }
]

//schema -->Basiclly  a modules of data that can be fetched through graphql server.
//resolver--> basically tell graphql server how to populate each schema wth data


const languageType = new GraphQLObjectType({
name: 'subject',
description: 'ProgrammingLanguage',
fields:{
    id:{
        type:GraphQLInt
    },
    subject:{
        type:GraphQLString
    },
    passed:{
        type:GraphQLBoolean
    },
    year:{
        type:GraphQLInt
    }
}

})

const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'this is root query',
    fields:{
        
        subjects:{
            type:GraphQLList(languageType),
            resolve: () => seedData
        },
        subject:{
            type:languageType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(_,{id}) => seedData.find(subject => subject.id ==id)
        }
    }
    
    })




    const rootMutation = new GraphQLObjectType({
        name: 'RootMutation',
        description: 'this is root Mutation',
        fields:{
            
            subjects:{
                type:GraphQLList(languageType),
                resolve: () => seedData
            },
            subject:{
                type:languageType,
                args:{
                    lang:{type:GraphQLString},
                    passed:{type:GraphQLBoolean}
                },
                resolve:(_,{lang,passed}) => {
                    const newLanguage ={
                        id: seedData.length+1,subject:lang,passed:passed}
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