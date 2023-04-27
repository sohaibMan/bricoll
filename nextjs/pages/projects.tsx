import {gql, useQuery} from '@apollo/client';

    const GET_PROJECT= gql`
        query Project($projectId: ObjectID!) {
            Project(id: $projectId) {
                client_id
                _id
                title
                description
                price
                skills
                reactions {
                    freelancer_id
                    reaction_type
                }
                created_at
                projectScope {
                    estimated_duration_in_days
                    level_of_expertise
                    size_of_project
                }
                attachments {
                    url
                    type
                }
                category
                stats {
                    declined_count
                    completed_count
                    approved_count
                    in_progress_count
                }
            }
    }`


export  default function DisplayLocations() {
    const { loading, error, data } = useQuery(GET_PROJECT,{
        variables: { projectId: "64491c61c6120ac4032f38e7" },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :  {error.message}</p>;

   return <p>{JSON.stringify(data,null,2)}</p>
}