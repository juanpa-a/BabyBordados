const { gql } = require('apollo-server');

const typeDefs = gql`
  directive @Auth on QUERY | FIELD_DEFINITION | FIELD

  input LoginInfo {
    email: String!
    password: String!
  }
  type Auth {
    token: String
    message: String
  }

  input UserInfo {
    name: String!
    lastname: String! 
    type: String  
    email: String!
    password: String!
  }
  input ProductInfo {
    name: String!
    price: Float!
    stock: Int!
    description: String!
    photo: String!
  }
  input CommentInfo {
    content: String!
    posted_by: String!
  }
  
  type Message {
    message: String
  }
  type Query {
    hi: String!
    test: String!
    # get_product
  }
  type Mutation {
    register(user_info: UserInfo): Auth
    login(login_info: LoginInfo): Auth
    # change_user_type

    add_product(product_info: ProductInfo): Message @Auth
    post_comment(comment_info: CommentInfo): Message 

  }

`;

module.exports = typeDefs;