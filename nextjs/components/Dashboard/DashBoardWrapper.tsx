import DashBoardProjects from "./MenuItems/ProjectsItem";
import moment from "moment/moment";
import {ContractsItem} from "./MenuItems/ContractsItem";
import {DashboardItems} from "../../pages/dashboard";
import {User, UserRole} from "../../types/resolvers";
import * as React from "react";
import {useState} from "react";
import {MyProfileItem} from "./MenuItems/MyProfileItem";
import {HomeItem} from "./MenuItems/HomeItem";
import {ProposalsItem} from "./MenuItems/ProposalsItem";

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
            {props.currentComponent === DashboardItems.Home && <HomeItem userRole={props.userRole} profile={props.profile}/>}

            <MyProfileItem currentComponent={props.currentComponent} user={props.profile}/>
            <DashBoardProjects
                currentComponent={props.currentComponent}
                projects={projects
                    .slice()
                    .sort((a, b) =>
                        moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                    )}
                setProjects={setProjects}

            />
            <ProposalsItem
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
            <ContractsItem
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
    );
};