import { gql } from "@apollo/client";

export const ADD_QUESTION = gql`
  mutation AddQuestion($text: String!, $options: [options_insert_input!]!) {
    insert_questions_one(object: { text: $text, options: { data: $options } }) {
      id
      text
      options {
        id
        text
      }
    }
  }
`;
