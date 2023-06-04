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

import { gql } from "@apollo/client";
import { User } from "../../types/resolvers";
import { client } from "../_app";
import CustomLink from "../../components/CustomLinks/CustomLink";
import { Skeleton } from "@mui/material";
import { useEditor } from "@tiptap/react";
import { ReadOnlyRichTextEditor } from "../../components/RichTextEditor/ReadOnlyRichTextEditor";
import StarterKit from "@tiptap/starter-kit";

export async function getServerSideProps({
  params,
}: {
  params: { profileId: string };
}) {
  const profileId = params.profileId;

  if (!profileId)
    return {
      notFound: true,
    };

  const { data } = await client.query<{ ProfileById: User }>({
    query: USER_PROFILE,
    variables: {
      profileId,
    },
  });
  const { ProfileById: profile } = data;

  if (!profile)
    return {
      notFound: true,
    };

  return {
    props: {
      profile,
    },
    revalidate: 3600,
  };
}

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

export default function ProfilePage({ profile }: { profile: User }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: JSON.parse(profile.bio || "{}"),
  });

  return (
    <section style={{ backgroundColor: "#eee" }}>
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
                    defaultValue={profile.reviews.reduce(
                      (prv, review) => prv + review.rating,
                      0
                    )}
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
                <MDBListGroup flush={"true"} className="rounded-3">
                  <div style={{ padding: "20px" }}>
                    <h3>Bio</h3>
                  </div>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    {editor ? (
                      <ReadOnlyRichTextEditor editor={editor} />
                    ) : (
                      <Skeleton />
                    )}
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>

            <br />

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush={"true"} className="rounded-3">
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
                <br />
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
                <hr />
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
                <hr />
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
                <hr />
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
                <br />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>{profile.jobTitle}</MDBCardText>
                  </MDBCol>
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
                    <MDBCardText>{profile.skills.join(" ")}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4">
              <MDBCardBody>
                <h3>Projects</h3>
                <br />
                <MDBRow>
                  {profile.projects?.map((project) => {
                    return (
                      <div key={project._id}>
                        <div className="card">
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
                      </div>
                    );
                  })}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
