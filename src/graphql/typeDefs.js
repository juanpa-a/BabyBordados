const { gql } = require('apollo-server');

const typeDefs = gql`
  directive @is_admin on FIELD_DEFINITION
  directive @is_employee on FIELD_DEFINITION
  directive @is_logged_in on FIELD_DEFINITION 

  type Auth {
    token: String
    message: String
  }
  input LoginInfo {
    email: String!
    password: String!
  }
  input EmployeeInfo {
    email: String!
    type: String!
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
    hi: String! @is_admin
    test: String! @is_logged_in
    # get_product
  }
  type Mutation {
    register(user_info: UserInfo): Auth 
    login(login_info: LoginInfo): Auth
    add_employee(user_info: UserInfo): Message @is_admin

    change_product_stock(product_info: ProductInfo): Message @is_employee @is_admin
    change_product_price(product_info: ProductInfo): Message @is_employee @is_admin

    add_product(product_info: ProductInfo): Message  @is_employee @is_admin
    delete_product(product_info: ProductInfo): Message @is_employee @is_admin

    post_comment(comment_info: CommentInfo): Message @is_logged_in
    delete_comment(comment_info: CommentInfo): Message @is_employee @is_admin
  }
`;

module.exports = typeDefs;