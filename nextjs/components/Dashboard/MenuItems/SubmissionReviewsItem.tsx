import {Submission_Review, UserRole} from "../../../types/resolvers";
import {useContext} from "react";
import {currentComponentContext} from "../DashBoardWrapper";
import {DashboardItems} from "../../../pages/dashboard";

export const SubmissionReviewsItem = ({
                                          userRole,
                                          submissionReviews
                                      }: {
    userRole: UserRole
    submissionReviews: Submission_Review[]
}) => {
    const {currentComponent} = useContext(currentComponentContext)
    // this component is shown only for SubmissionReviews and SubmitReview
    if (currentComponent !== DashboardItems.SubmissionReviews && currentComponent !== DashboardItems.SubmitReview) return <></>;

    return (
        <>{JSON.stringify(submissionReviews)}</>
    )
}