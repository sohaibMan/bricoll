import {DocumentNode, useMutation} from "@apollo/client";
import Box from "@mui/joy/Box";
import * as React from "react";
import {FormEvent, useRef, useState} from "react";
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
    MutationEditProjectArgs,
    Project,
    ProjectCategoriesEnum,
    ProjectScopeInput,
    Size_Of_Project
} from "../../types/resolvers";
import {PriceInput} from "../Inputs/PriceInput";
import {DurationInput} from "../Inputs/DurationInput";


//TODO ADD ATTACHMENTS TO PROJECT
//TODO make this request idempotent
//TODO the freelancer and Unauthorized user can't create a project

type MutationProjectArgs = MutationCreateProjectArgs | MutationEditProjectArgs;
// node : THIS PAGE IS USED IN 2 PLACES(EDIT AND CREATE PROJECT)
export default function ProjectForm(props: { project?: Project, PROJECT_MUTATION: DocumentNode }) {


    const defaultState = {
        title: props.project?.title || "",
        description: props.project?.description || "",
        price: props.project?.price || "",
        duration: props.project?.projectScope.estimated_duration_in_days || "",
        skills: props.project?.skills || [],
        category: props.project?.category.split("_").join(" ").toLowerCase() as ProjectCategoriesEnum || "",
        projectSize: props.project?.projectScope.size_of_project.split("_").join(" ").toLowerCase() || "",
        levelOfExpertise: props.project?.projectScope.level_of_expertise.split("_").join(" ").toLowerCase() || ""
    }

    const [mutationProject, {data, loading, error}] = useMutation(props.PROJECT_MUTATION)
    // todo (handle mutation response )

    // mutationProject (create or edit) project

    const [price, setPrice] = useState<string>(defaultState.price.toString());
    const [duration, setDuration] = useState<string>(defaultState.duration.toString());
    const [description, setDescription] = useState<string>(defaultState.description);
    const [skills, setSkills] = React.useState<string[]>(defaultState.skills);
    const [title, setTitle] = useState<string>(defaultState.title);
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
        const mutationProjectArgs: MutationProjectArgs = {
            id: props.project?._id,
            price: +price,
            title,
            description,
            skills,
            projectScope,
            category: categoriesAutocompleteRef.current.value.split(" ").join("_").toUpperCase() as ProjectCategoriesEnum
        }
        try {
            toast.promise(
                mutationProject({
                    variables: mutationProjectArgs
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

                    <PriceInput value={price} onChange={(e) => setPrice(() => e.target.value)}/>

                    <DurationInput value={duration} onChange={(e) => setDuration(() => e.target.value)}/>

                    <CategoriesAutocomplete defaultValue={defaultState.category} placeholder="categories"
                                            parentRef={categoriesAutocompleteRef}/>

                    <LevelOfExpertiseAutoComplete defaultValue={defaultState.levelOfExpertise}
                                                  placeholder="Level of expertise"
                                                  parentRef={levelOfExpertiseAutoComplete}/>

                    <ProjectSizeAutoComplete defaultValue={defaultState.projectSize} placeholder="Project size"
                                             parentRef={projectSizeAutocompleteRef}/>
                    <SkillsAutocomplete skills={skills} setSkills={setSkills}/>

                    <Textarea defaultValue={defaultState.description} placeholder="Description" value={description}
                              required
                              onChange={(e) => setDescription(() => e.target.value)} minRows={4}/>


                </Stack>


                <Button type=" submit"> Submit</Button>

            </form>

        </Box>
    )
        ;
}