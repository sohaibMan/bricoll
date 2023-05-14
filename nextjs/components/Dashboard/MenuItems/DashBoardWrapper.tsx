import DashBoardProjects from "./DashBoardProjects";
import moment from "moment/moment";
import {DashBoardProposals} from "./DashBoardProposals";
import {DashBoardContracts} from "./DashBoardContracts";
import {DashboardItems} from "../../../pages/dashboard";
import {User, UserRole} from "../../../types/resolvers";
import * as React from "react";
import {useState} from "react";
import {MyProfile} from "../MyProfile";

export const DashBoardWrapper = (props: {
    currentComponent: DashboardItems
    userRole: UserRole
    profile: User
}) => {

    const [projects, setProjects] = useState(props.profile.projects);
    const [proposals, setProposals] = useState(props.profile.proposals);
    const [contracts, setContracts] = useState(props.profile.contracts);
    return (
        <>
            <MyProfile currentComponent={props.currentComponent} user={props.profile}/>
            <DashBoardProjects
                currentComponent={props.currentComponent}
                projects={projects
                    .slice()
                    .sort((a, b) =>
                        moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                    )}
                setProjects={setProjects}

            />
            <DashBoardProposals
                userRole={props.userRole}
                currentComponent={props.currentComponent}
                proposals={proposals
                    .slice()
                    .sort((a, b) =>
                        moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                    )}
                setProposals={setProposals}
                setContracts={setContracts}
            />
            <DashBoardContracts
                userRole={props.userRole}
                currentComponent={props.currentComponent}
                contracts={contracts
                    .slice()
                    .sort((a, b) =>
                        moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                    )}
                setContracts={setContracts}
            />
        </>
    )
}