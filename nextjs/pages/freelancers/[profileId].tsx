import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import db from "../../lib/mongodb";
import { ObjectId } from "mongodb";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Box from "@mui/joy/Box";
import Link from "@mui/joy/Link";
import CircularProgress from "@mui/joy/CircularProgress";
import moment from "moment";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

import { gql, useQuery } from "@apollo/client";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { User } from "../../types/resolvers";
import { redirect } from "next/navigation";

// const projects = db.collection("projects");
// const users = db.collection("users");

const USER_PROFILE = gql`
  query ProfileById($profileByIdId: ObjectID!) {
    ProfileById(id: $profileByIdId) {
      name
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
    }
  }
`;

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { profileId } = router.query;

  // TODO: -> Checking if the user is authenticated
  // if (!session?.user) {
  //   redirect("/api/auth/signin");
  // }

  // TODO: -> Protecting this route from client users
  // TODO: -> Linking the reviews with projects to get the rating
  // TODO: -> Implementing the logic of followers

  // console.log("profileId : ", profileId);

  // if(!profileId) {
  //   profileId = JSON.stringify(session?.user.id)
  //   router.push(`/freelancers/${profileId}`)
  // }

  // console.log("session data : ", session?.user.id);

  const { loading, error, data } = useQuery<{ ProfileById: User }>(
    USER_PROFILE,
    {
      variables: {
        profileByIdId: profileId,
      },
    }
  );

  console.log("userData: ", data);

  if (loading)
    return (
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "350px",
        }}
      >
        <Link
          component="button"
          variant="outlined"
          startDecorator={
            <CircularProgress
              variant="plain"
              thickness={2}
              sx={{ "--CircularProgress-size": "16px" }}
            />
          }
          sx={{ p: 1 }}
        >
          Loading...
        </Link>
      </Box>
    );

  if (error) return <h1>{error.message}</h1>;

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/freelancers">freelancers</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                {data?.ProfileById.image && (
                  <MDBCardImage
                    src={data?.ProfileById.image}
                    alt="avatar"
                    className="rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      marginBottom: "10px",
                    }}
                    fluid
                  />
                )}

                <p className="text-muted mb-1">{data?.ProfileById.jobTitle}</p>
                <p className="text-muted mb-4">{data?.ProfileById.address}</p>
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
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                </Stack>
                {/* <br /> */}
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn style={{ backgroundColor: "#73bb44" }}>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">
                    Message
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  {/* <br /> */}
                  <div style={{ padding: "20px" }}>
                    <h3>Bio</h3>
                  </div>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>{data?.ProfileById.bio}</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>

            <br />

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  {/* <br /> */}
                  <div style={{ padding: "20px" }}>
                    <h3>Portfolio</h3>
                  </div>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="github fa-lg"
                      style={{ color: "#333333" }}
                    />
                    <MDBCardText>
                      {data?.ProfileById.portfolio && (
                        <a href={data?.ProfileById.portfolio}>Github</a>
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
                <br />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {data?.ProfileById.name}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {data?.ProfileById.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {data?.ProfileById.phone}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {data?.ProfileById.address}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4">
              <MDBCardBody>
                <h3>Experiences</h3>
                <br />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>{data?.ProfileById.jobTitle}</MDBCardText>
                  </MDBCol>
                  {/* <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Johnatan Smith
                    </MDBCardText>
                  </MDBCol> */}
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4">
              <MDBCardBody>
                <h3>Skills</h3>
                <br />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>{data?.ProfileById.skills}</MDBCardText>
                  </MDBCol>
                  {/* <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Johnatan Smith
                    </MDBCardText>
                  </MDBCol> */}
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4">
              <MDBCardBody>
                <h3>Projects</h3>
                <br />
                <MDBRow>
                  {/* <MDBCol sm="3"> */}
                  {data?.ProfileById.projects?.map((project) => {
                    let count = 0;
                    return (
                      <>
                        <div className="card">
                          <div className="card-header text-center">
                            Featured
                          </div>
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
                          <hr />
                        </div>
                      </>
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
