import {gql, useMutation} from "@apollo/client";
import Box from "@mui/joy/Box";
import * as React from "react";
import {FormEvent, useRef, useState} from "react";
import Input from "@mui/joy/Input";
import Textarea from '@mui/joy/Textarea';
import {Stack} from "@mui/joy";
import Button from "@mui/joy/Button";
import toast from "react-hot-toast";
import SkillsAutocomplete from "../AutoCompletes/SkillsAutocomplete";
import CategoriesAutocomplete from "../AutoCompletes/CategoriesAutocomplete";
import ProjectSizeAutoComplete from "../AutoCompletes/ProjectSizeAutoComplete";
import LevelOfExpertiseAutoComplete from "../AutoCompletes/LevelOfExpertiseAutoComplete";
import {
    Level_Of_Expertise,
    MutationCreateProjectArgs,
    ProjectCategoriesEnum,
    ProjectScopeInput,
    Size_Of_Project
} from "../../../types/resolvers";


//TODO ADD ATTACHMENTS TO PROJECT
//TODO make this request idempotent
//TODO the freelancer and Unauthorized user can't create a project
const CREATE_PROJECT_MUTATION = gql`
    mutation CreateProject($title: String!, $description: String!, $price: Float!, $skills: [String!]!, $projectScope: ProjectScopeInput!, $category: ProjectCategoriesEnum!) {
        createProject(title: $title, description: $description, price: $price, skills: $skills, projectScope: $projectScope, category: $category) {
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
                name
            }
            category
            stats {
                declined_count
                completed_count
                approved_count
                in_progress_count
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
            }
        }
    }
`;


export default function CreatProjectForm() {
    const [creatProject, {data, loading, error}] = useMutation(CREATE_PROJECT_MUTATION)
    // todo (handle mutation response )

    const [price, setPrice] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [skills, setSkills] = React.useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const categoriesAutocompleteRef = useRef<HTMLInputElement>(null);
    const levelOfExpertiseAutoComplete = useRef<HTMLInputElement>(null);
    const projectSizeAutocompleteRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (+title.length >= 100 || +title.length <= 5) return toast.error("Title should be between 5 and 1000")
        if (+price <= 0 || +price >= 100000) return toast.error("Price can't be negative or less or equal to 1")
        if (+duration <= 0 || +duration >= 90) return toast.error("Duration should be greater than 1 and less than 90 days")
        if (!categoriesAutocompleteRef.current?.value) return toast.error("Please select a category")
        if (!levelOfExpertiseAutoComplete.current?.value) return toast.error("Please select a level of expertise")
        if (!projectSizeAutocompleteRef.current?.value) return toast.error("Please select a project size")
        if (skills.length > 5) return toast.error("Max 5 skills")
        if (+description.length >= 1000 || +description.length <= 5) return toast.error("Description should be between 5 and 1000")

        const projectScope: ProjectScopeInput = {
            estimated_duration_in_days: +duration,
            level_of_expertise: levelOfExpertiseAutoComplete.current.value.split(" ").join("_").toUpperCase() as Level_Of_Expertise,
            size_of_project: projectSizeAutocompleteRef.current.value.split(" ").join("_").toUpperCase() as Size_Of_Project
        }
        const mutationCreateProjectArgs: MutationCreateProjectArgs = {
            price: +price,
            title,
            description,
            skills,
            projectScope,
            category: categoriesAutocompleteRef.current.value.split(" ").join("_").toUpperCase() as ProjectCategoriesEnum
        }
        try {
            toast.promise(
                creatProject({
                    variables: mutationCreateProjectArgs
                }),
                {
                    loading: 'Saving...',
                    success: <b>Form submitted!</b>,
                    error: <b>{error?.message}</b>,
                }
            ).then(() => {
                // setPrice("")
                // setDescription("")
                // setTitle("")
                // setDuration("")
                // setSkills([])
                //todo redirect to project page to see your project in details later
            })

        } catch (e) {
            console.error(e)
        }
    }


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <Box
            sx={{
                py: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>

                    <Textarea placeholder="Title" value={title} required
                              onChange={(e) => setTitle(() => e.target.value)} minRows={2}/>

                    <Input
                        value={price}
                        onChange={(e) => setPrice(() => e.target.value)}
                        placeholder="Price"
                        error={price != "" && +price <= 0}
                        startDecorator='$'
                        type="number"
                        required
                    />
                    <Input
                        value={duration}
                        error={duration != "" && +duration <= 0 || +duration >= 90}
                        onChange={(e) => setDuration(() => e.target.value)}
                        placeholder="Duration"
                        type="number"
                        required
                    />
                    <CategoriesAutocomplete placeholder="categories" parentRef={categoriesAutocompleteRef}/>
                    <LevelOfExpertiseAutoComplete placeholder="Level of expertise"
                                                  parentRef={levelOfExpertiseAutoComplete}/>
                    <ProjectSizeAutoComplete placeholder="Project size" parentRef={projectSizeAutocompleteRef}/>


                    <SkillsAutocomplete skills={skills} setSkills={setSkills}/>

                    <Textarea placeholder="description" value={description} required
                              onChange={(e) => setDescription(() => e.target.value)} minRows={4}/>


                </Stack>


                <Button type=" submit"> Submit</Button>

            </form>

        </Box>
    )
        ;
}