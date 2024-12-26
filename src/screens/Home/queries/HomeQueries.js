import { gql } from "@apollo/client";

export const GET_QUESTIONS_SUBSCRIPTION = gql`
  subscription GetQuestions {
    questions {
      id
      text
      options @connection(key: "options") {
        id
        text
        answersByOptionId_aggregate {
          aggregate {
            count(columns: id)
          }
        }
      }
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation AddQuestion($text: String!, $options: [option_insert_input!]!) {
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
