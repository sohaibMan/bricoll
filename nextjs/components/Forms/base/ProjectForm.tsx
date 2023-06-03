import {DocumentNode, useMutation} from "@apollo/client";
import {FormEvent, useRef, useState} from "react";
import Textarea from '@mui/joy/Textarea';
import {Divider, Stack} from "@mui/joy";
import Button from "@mui/joy/Button";
import toast from "react-hot-toast";
import SkillsAutocomplete from "../../AutoCompletes/SkillsAutocomplete";
import CategoriesAutocomplete from "../../AutoCompletes/CategoriesAutocomplete";
import ProjectSizeAutoComplete from "../../AutoCompletes/ProjectSizeAutoComplete";
import LevelOfExpertiseAutoComplete from "../../AutoCompletes/LevelOfExpertiseAutoComplete";
import {
    Level_Of_Expertise,
    Project,
    ProjectCategoriesEnum,
    ProjectScopeInput,
    Size_Of_Project
} from "../../../types/resolvers";
import {PriceInput} from "../../Inputs/PriceInput";
import {DurationInput} from "../../Inputs/DurationInput";
import Typography from '@mui/joy/Typography';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import uploadFilesToBlob from "../../../utils/azure-storage-blob";

import 'react-quill/dist/quill.snow.css'
import "../../../styles/quill.css"
import {RichTextEditor} from "../../Inputs/RichTextEditor";


// note : THIS PAGE IS USED IN 2 PLACES(EDIT AND CREATE PROJECT)
export default function ProjectForm(props: {
    project?: Project,
    PROJECT_MUTATION: DocumentNode,
    onSubmitProjectHandler: (project: Project) => void
    label?: string
}) {


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


    const [price, setPrice] = useState<string>(defaultState.price.toString());
    const [duration, setDuration] = useState<string>(defaultState.duration.toString());
    const [description, setDescription] = useState<string>(defaultState.description);
    const [skills, setSkills] = useState<string[]>(defaultState.skills);
    const [title, setTitle] = useState<string>(defaultState.title);
    const categoriesAutocompleteRef = useRef<HTMLInputElement | null>(null);
    const levelOfExpertiseAutoComplete = useRef<HTMLInputElement | null>(null);
    const projectSizeAutocompleteRef = useRef<HTMLInputElement | null>(null);

    const [mutationProject, {loading, error}] = useMutation(props.PROJECT_MUTATION)


    const [uploadedFilesList, setUploadedFilesList] = useState<FileList | null>(null);
    const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (+title.length >= 100 || +title.length <= 5) return toast.error("Title should be between 5 and 1000")
        if (+price <= 0 || +price >= 100000) return toast.error("Price can't be negative or less or equal to 1")
        if (+duration <= 0 || +duration >= 90) return toast.error("Duration should be greater than 1 and less than 90 days")
        if (!categoriesAutocompleteRef.current?.value) return toast.error("Please select a category")
        if (!levelOfExpertiseAutoComplete.current?.value) return toast.error("Please select a level of expertise")
        if (!projectSizeAutocompleteRef.current?.value) return toast.error("Please select a project size")
        if (skills.length > 5) return toast.error("Max 5 skills")
        if (+description.length >= 100000 || +description.length <= 5) return toast.error("Description should be between 5 and 100000")
        if (uploadedFilesList && uploadedFilesList.length >= 6) return toast.error("You can't upload more than 5 files")


        const projectScope: ProjectScopeInput = {
            estimated_duration_in_days: +duration,
            level_of_expertise: levelOfExpertiseAutoComplete.current?.value.split(" ").join("_").toUpperCase() as Level_Of_Expertise,
            size_of_project: projectSizeAutocompleteRef.current?.value.split(" ").join("_").toUpperCase() as Size_Of_Project
        }


        const mutationProjectArgs: any = {
            id: props.project?._id,
            price: +price,
            title,
            description,
            skills,
            projectScope,
            category: categoriesAutocompleteRef.current?.value.split(" ").join("_").toUpperCase() as ProjectCategoriesEnum,
            attachments: [] // default value
        }

        if (uploadedFilesList) {
            await toast.promise((async () => {
                mutationProjectArgs.attachments = await uploadFilesToBlob(Array.from(uploadedFilesList))

            })(), {
                loading: 'Uploading your files...',
                success: <b>File uploaded !</b>,
                error: <b>Failed to upload files</b>,
            })
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
            ).then(({data}: any) => {
                //  any : FetchResult<{createProject:Project>}

                const editProject = {
                    _id: props.project?._id || data.createProject._id,
                    price: +price,
                    title,
                    description,
                    skills,
                    projectScope,
                    category: categoriesAutocompleteRef.current?.value,
                    attachments: mutationProjectArgs.attachments
                } as unknown as Project;

                props.onSubmitProjectHandler(editProject)//to close the modal and update the ui

            })

        } catch (e) {
            console.error(e)
        }
    }


    return (

        <form onSubmit={handleSubmit} style={{width: "100%"}}>
            <Stack spacing={1} sx={{width: "100%"}}>
                {props.label && <Typography level="h4">{props.label}</Typography>}
                <Textarea placeholder="Title" defaultValue={defaultState.title} required maxRows={4}
                          onChange={(e) => setTitle(() => e.target.value)} minRows={2}/>

                <Stack spacing={1} direction="row" justifyContent="space-between"
                       divider={<Divider orientation="vertical"/>}>
                    <PriceInput value={price} onChange={(e) => setPrice(() => e.target.value)}/>

                    <DurationInput value={duration} onChange={(e) => setDuration(() => e.target.value)}/>


                </Stack>


                <Stack spacing={1} direction="row" justifyContent="space-between"
                       divider={<Divider orientation="vertical"/>}>
                    <LevelOfExpertiseAutoComplete defaultValue={defaultState.levelOfExpertise}
                                                  placeholder="Level of expertise"
                                                  parentRef={levelOfExpertiseAutoComplete}/>

                    <ProjectSizeAutoComplete defaultValue={defaultState.projectSize} placeholder="Project size"
                                             parentRef={projectSizeAutocompleteRef}/>

                </Stack>

                {/*<Stack spacing={1} direction="row"   justifyContent="spcenterace-between"  divider={<Divider orientation="vertical" />}>*/}
                <CategoriesAutocomplete defaultValue={defaultState.category}
                                        parentRef={categoriesAutocompleteRef}/>

                {/*</Stack>*/}
                <SkillsAutocomplete skills={skills} setSkills={setSkills}/>


                <RichTextEditor defaultValue={description}
                                onChange={(input) => setDescription(() => input)}
                                theme="snow"/>


                {/*<Stack direction={"row"} alignItems={"center"}>*/}
                <Stack spacing={1} direction="row" justifyContent="space-between">
                    <Button
                        component="label"
                        color="neutral"

                    >
                        <input onChange={(e) => setUploadedFilesList(e.target.files)} hidden accept="*"
                               multiple
                               type="file"/>
                        Add attachments
                        <FileUploadIcon/>
                    </Button>

                    {/*</Stack>*/}
                    <Button disabled={loading} type="submit"> Submit</Button>
                </Stack>

            </Stack>


        </form>

        // </Box>
    )
        ;
}