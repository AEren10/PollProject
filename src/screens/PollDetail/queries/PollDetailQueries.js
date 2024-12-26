import { gql } from "@apollo/client";

export const GET_QUESTION_DETAIL = gql`
  subscription GetQuestionDetail($id: Int!) {
    questions_by_pk(id: $id) {
      id
      text
      created_time
      options {
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

export const VOTE_ON_OPTION = gql`
  mutation VoteOnOption($optionId: Int!) {
    insert_answers_one(object: { option_id: $optionId }) {
      id
      option_id
    }
  }
`;
