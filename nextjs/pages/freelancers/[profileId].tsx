import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import moment from "moment";

import {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow,
} from "mdb-react-ui-kit";

import {gql} from "@apollo/client";
import {User} from "../../types/resolvers";
import {client} from "../_app";
// import db from "../../lib/mongodb";
import CustomLink from "../../components/CustomLinks/CustomLink";
import {RichTextEditor} from "../../components/Inputs/RichTextEditor";


// const usersCollection = db.collection("users")

// todo make this page Incremental Static Regeneration for better seo
// todo fix the static reviews count
// todo hand user not found

export async function getServerSideProps({params}: { params: { profileId: string } }) {

    const profileId = params.profileId;

    if (!profileId) return {
        notFound: true
    }


    const {data} = await client.query<{ ProfileById: User }>({
        query: USER_PROFILE,
        variables: {
            profileId
        },

    });
    const {ProfileById: profile} = data;


    if (!profile) return {
        notFound: true
    }


    return {
        props: {
            profile
        },
        revalidate: 3600,
    };
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     paths

//     const freelancers = await usersCollection.find({
//             userRole: UserRole.Freelancer,
//             isCompleted: true,
//             // isEmailVerfied: true
//         },
//         {
//             projection: {
//                 _id: 1
//             }
//         }).toArray()
//     const paths = freelancers.map(doc => ({
//         params: {profileId: doc._id.toString()},
//     }))
// temporary don't generate any path
// return {
//     paths: [], fallback: "blocking"
//
// }
//
// }


const USER_PROFILE = gql`
    query ProfileById($profileId: ObjectID!) {
        ProfileById(id: $profileId) {
            username
            email
            image
            phone
            address
            jobTitle
            skills
            portfolio
            bio
            projects {
                _id
                title
                description
                skills
                created_at
                category
            }
            reviews {
                rating
            }
        }
    }
`;

export default function ProfilePage({profile}: { profile: User }) {

    // const {data: session} = useSession();
    // const router = useRouter();
    // const {profileId} = router.query;


    // TODO: -> Checking if the users is authenticated : but we can remove this condition

    // TODO: -> Linking the reviews with projects to get the rating
    // TODO: OPTIONAL -> Implementing the logic of followers

    // console.log("profileId : ", profileId);

    // if(!profileId) {
    //   profileId = JSON.stringify(session?.users.id)
    //   router.push(`/freelancers/${profileId}`)
    // }

    // console.log("session data : ", session?.users.id);
    //
    // const {loading, error, data} = useQuery<{ ProfileById: User }>(
    //     USER_PROFILE,
    //     {
    //         variables: {
    //             profileByIdId: profileId,
    //         },
    //     }
    // );

    // let averageRating;
    //
    // if (profile.reviews && profile.reviews?.length > 0) {
    //     const totalRating = profile.reviews.reduce((sum, review) => {
    //         if (review?.rating && sum + review?.rating) {
    //             return sum + review?.rating;
    //         }
    //         return 0;
    //     }, 0);
    //     averageRating = totalRating / profile.reviews.length;
    //     console.log("Average rating:", averageRating);
    // } else {
    //     console.log("No reviews found.");
    // }

    // console.log("userData: ", data);

    // if (loading)
    //     return (
    //         <Box
    //             sx={{
    //                 justifyContent: "center",
    //                 display: "flex",
    //                 gap: 2,
    //                 alignItems: "center",
    //                 flexWrap: "wrap",
    //                 marginTop: "350px",
    //             }}
    //         >
    //             <Link
    //                 component="button"
    //                 variant="outlined"
    //                 startDecorator={
    //                     <CircularProgress
    //                         variant="plain"
    //                         thickness={2}
    //                         sx={{"--CircularProgress-size": "16px"}}
    //                     />
    //                 }
    //                 sx={{p: 1}}
    //             >
    //                 Loading...
    //             </Link>
    //         </Box>
    //     );
    //
    // if (error) return <h1>{error.message}</h1>;

    return (
        <section style={{backgroundColor: "#eee"}}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem>
                                <CustomLink href="/">Home</CustomLink>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem>
                                <CustomLink href="/freelancers">freelancers</CustomLink>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">

                                <MDBCardImage
                                    src={profile.image}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        marginBottom: "10px",
                                    }}
                                    fluid
                                />


                                <p className="text-muted mb-1">{profile.jobTitle}</p>
                                <p className="text-muted mb-4">{profile.address}</p>
                                {/* <h5>Ratings</h5> */}
                                <Stack
                                    style={{
                                        alignContent: "center",
                                        paddingLeft: "32%",
                                        paddingBottom: "30px",
                                    }}
                                    spacing={1}
                                >
                                    <Rating
                                        name="half-rating-read"
                                        defaultValue={profile.reviews.reduce((prv, review) => prv + review.rating, 0)}
                                        precision={0.5}
                                        readOnly
                                    />
                                </Stack>
                                {/* <br /> */}
                                <div className="d-flex justify-content-center mb-2">
                                    <MDBBtn style={{backgroundColor: "#73bb44"}}>Follow</MDBBtn>
                                    <MDBBtn outline className="ms-1">
                                        Message
                                    </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup flush={"true"} className="rounded-3">
                                    {/* <br /> */}
                                    <div style={{padding: "20px"}}>
                                        <h3>Bio</h3>
                                    </div>

                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        {/*<MDBCardText>{profile.bio}</MDBCardText>*/}
                                        <RichTextEditor readOnly={true} value={profile.bio} theme="bubble"/>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>

                        <br/>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup flush={"true"} className="rounded-3">
                                    {/* <br /> */}
                                    <div style={{padding: "20px"}}>
                                        <h3>Portfolio</h3>
                                    </div>

                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fab
                                            icon="github fa-lg"
                                            style={{color: "#333333"}}
                                        />
                                        <MDBCardText>
                                            {profile.portfolio && (
                                                <CustomLink href={profile.portfolio}>Github</CustomLink>
                                            )}
                                        </MDBCardText>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <h3>All Personal Informations</h3>
                                <br/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {profile.username}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {profile.email}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {profile.phone}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {profile.address}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <h3>Experiences</h3>
                                <br/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>{profile.jobTitle}</MDBCardText>
                                    </MDBCol>
                                    {/* <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Johnatan Smith
                    </MDBCardText>
                  </MDBCol> */}
                                </MDBRow>
                                <hr/>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <h3>Skills</h3>
                                <br/>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>{profile.skills.join(" ")}</MDBCardText>
                                    </MDBCol>
                                    {/* <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Johnatan Smith
                    </MDBCardText>
                  </MDBCol> */}
                                </MDBRow>
                                <hr/>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <h3>Projects</h3>
                                <br/>
                                <MDBRow>
                                    {/* <MDBCol sm="3"> */}
                                    {profile.projects?.map((project) => {
                                        return (
                                            <div key={project._id}>
                                                <div className="card">
                                                    {/*<div className="card-header text-center">*/}
                                                    {/*    Featured*/}
                                                    {/*</div>*/}
                                                    <div className="card-body text-center">
                                                        <h4 className="card-title text-center">
                                                            {project.title}
                                                        </h4>
                                                        <p className="card-text">{project.description}</p>
                                                        <Stack
                                                            style={{
                                                                alignContent: "center",
                                                                paddingLeft: "42%",
                                                                paddingBottom: "30px",
                                                            }}
                                                            spacing={1}
                                                        >
                                                            <Rating
                                                                name="half-rating-read"
                                                                defaultValue={2.5}
                                                                precision={0.5}
                                                                readOnly
                                                            />
                                                        </Stack>
                                                        <a
                                                            href="#"
                                                            className="btn"
                                                            style={{
                                                                backgroundColor: "#73bb44",
                                                                color: "white",
                                                            }}
                                                        >
                                                            Go somewhere
                                                        </a>
                                                    </div>
                                                    <div className="card-footer text-muted text-center">
                                                        {moment(project.created_at).fromNow()}
                                                    </div>
                                                    <hr/>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* </MDBCol> */}
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        {/* <MDBRow>
              <MDBCol md="6"> */}
                        {/* <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar style={{backgroundColor: '#73bb44'}} width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard> */}
                        {/* </MDBCol> */}
                        {/* </MDBRow> */}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
