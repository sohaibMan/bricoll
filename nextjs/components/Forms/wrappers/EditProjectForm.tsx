import ProjectForm from "../base/ProjectForm";
import { gql } from "@apollo/client";
import { Project } from "../../../types/resolvers";
import * as React from "react";

const EDIT_PROJECT_MUTATION = gql`
  mutation EditProject(
    $id: ObjectID!
    $title: String
    $description: String
    $price: Float
    $skills: [String!]
    $projectScope: ProjectScopeInput
    $category: ProjectCategoriesEnum
  ) {
    editProject(
      id: $id
      title: $title
      description: $description
      price: $price
      skills: $skills
      projectScope: $projectScope
      category: $category
    ) {
      _id
    }
  }
`;

export default function EditProjectForm(props: {
  project: Project;
  onSubmitProjectHandler: (project: Project) => void;
}) {
  return (
    <ProjectForm
      label="Edit an existing project"
      onSubmitProjectHandler={props.onSubmitProjectHandler}
      PROJECT_MUTATION={EDIT_PROJECT_MUTATION}
      project={props.project}
    />
  );
}
