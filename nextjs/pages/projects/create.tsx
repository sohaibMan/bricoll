import ProjectForm from "../Components/Forms/ProjectForm";
import {gql} from "@apollo/client";

const CREATE_PROJECT_MUTATION = gql`
mutation CreateProject($title: String!, $description: String!, $price: Float!, $skills: [String!]!, $projectScope: ProjectScopeInput!, $category: ProjectCategoriesEnum!) {
  createProject(title: $title, description: $description, price: $price, skills: $skills, projectScope: $projectScope, category: $category) {
    client_id
    _id
    title
    description
    price
    skills
    created_at
    category
    reactions {
      freelancer_id
      reaction_type
    }
    projectScope {
      estimated_duration_in_days
      level_of_expertise
      size_of_project
    }
    attachments {
      url
      type
      name
    }
  }
}
`;
const createProject = () => {


    return <ProjectForm PROJECT_MUTATION={CREATE_PROJECT_MUTATION}/>;
};

export default createProject;
