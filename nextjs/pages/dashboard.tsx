import {gql, useQuery} from "@apollo/client";
import {User} from "../types/resolvers";
import {useSession} from "next-auth/react";
import {DashBoardWrapper} from "../components/Dashboard/DashBoardWrapper";
import {LoadingDashboard} from "../components/Dashboard/LoadingDashboard";


export enum DashboardItems {
    MyProfile = "MyProfile",
    Projects = "Projects",
    Home = "Home",
    CreateProject = "CreateProject",
    Proposals = "Proposals",
    Contracts = "Contracts",
    SubmissionReviews = "SubmissionReviews",
}

const USER_PROFILE = gql`
    query Profile {
        Profile {
            _id
            username
            email
            image
            projects_stats {
                month
                count
            }
            #            proposals_stats {
            #                count
            #                status
            #            }
            #            contracts_stats {
            #                count
            #                status
            #            }
            payments {
                currency
                amount
                contract_id
                description
            }
            projects {
                client_id
                _id
                title
                description
                price
                skills
                created_at
                projectScope {
                    estimated_duration_in_days
                    level_of_expertise
                    size_of_project
                }
                attachments {
                    url
                    name
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
            proposals {
                _id
                project_id
                freelancer_id
                client_id
                price
                duration
                description
                cover_letter
                created_at
                updated_at
                status
                attachments {
                    url
                    name
                    type
                }
                user {
                    _id
                    username
                    image
                }
            }
            contracts {
                _id
                freelancer_id
                client_id
                project_id
                proposal_id
                price
                duration
                status
                created_at
                updated_at
                terms
                #                submission_reviews {
                #                    _id
                #                    attachments {
                #                        url
                #                        type
                #                        name
                #                    }
                #                    title
                #                    description
                #                    created_at
                #                    updated_at
                #                    accepted_at
                #                    status
                #                }
                fees
            }

        }
    }
`;

export default function Index() {
    const session = useSession();
    const {loading, error, data} = useQuery<{ Profile: User }>(USER_PROFILE);

    if (loading)
        return (
            <LoadingDashboard/>
        );

    if (!session.data?.user.userRole) return <h1>not auth</h1>;
    const userRole = session.data?.user.userRole;
    // todo :fix this mess
    if (error || !data || !data.Profile)
        return (
            <h1>
                `Error! {error !== undefined ? error?.message : "An Error has occurred"}
            </h1>
        );

    return (
        <DashBoardWrapper userRole={userRole} profile={data.Profile}/>
    );
}
