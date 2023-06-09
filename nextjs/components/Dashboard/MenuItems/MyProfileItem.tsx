import React, {ChangeEvent, MouseEvent, useState} from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip, {chipClasses} from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, {tabClasses} from "@mui/joy/Tab";
import DropZone from "../DropZone";
import {User} from "../../../types/resolvers";
import toast from "react-hot-toast";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import {DashboardItems} from "../../../pages/dashboard";
import BillingCard from "../../Cards/BillingCard";
import {useEditor} from "@tiptap/react";
import {EditableRichTextEditor, RichTextEditorExtensions} from "../../RichTextEditor/EditableRichTextEditor";
import CircularProgress from '@mui/joy/CircularProgress'
import Stack from "@mui/joy/Stack";

// const imageURL = ref
enum currentTabEnum {
    AccountSetting = "AccountSetting",
    Billing = "Billing",
}

export const MyProfileItem = (props: {
    user: User;
    currentComponent: DashboardItems;
}) => {
    const [usernameState, setNameState] = useState(props.user.username);
    const [emailState, setEmailState] = useState(props.user.email);
    const [imageLinkState, setImageLinkState] = useState(props.user.image);
    const [currentTab, setCurrentTab] = useState<currentTabEnum>(
        currentTabEnum.AccountSetting
    );
    const editor = useEditor({extensions: RichTextEditorExtensions("Enter your bio "), content: JSON.parse(props.user.bio)});

    if (props.currentComponent != DashboardItems.MyProfile) return <></>;

    // const isSameState =
    //     usernameState === props.user.username &&
    //     emailState === props.user.email &&
    //     imageLinkState === props.user.image &&
    //     bio=== JSON.stringify(props.user.bio);


    async function updateHandling(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!usernameState) return toast.error("The username is empty, try to insert it!");
        if (!emailState)
            return toast.error("The email is empty, try to insert it!");

        if (!emailState.includes('@')) return toast.error("Invalid Email Format!")

        if (!imageLinkState)
            return toast.error("The image is empty, try to upload it!");


        const bio = editor?.getJSON();


        await toast.promise(fetch(`/api/users/editProfile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: usernameState,
                email: emailState,
                image: imageLinkState,
                bio
            }),
        }).then((res)=>res.json()).then((data)=>{
            // if(data.status==="failed") throw new Error(data.message);
            return data.message;
        }),{
            loading: "Updating...",
            success: msg=>msg,
            error: (err) => err
        }).catch(err=>console.error(err))

        // const response = ;
        //
        // const res = await response.json();
        //
        // if (res.status != "success") toast.error("oops an error has occurred");


        // toast.success("The profile is updated successfully ");
    }

    function cancelHandling() {
        // e.preventDefault()
        setEmailState(props.user.email);
        setNameState(props.user.username);
        setImageLinkState(props.user.image);
        editor?.commands.setContent(props.user.bio);
    }

    return (
        <form onSubmit={updateHandling} key={props.user._id}>
            <Sheet
                sx={{
                    bgcolor: "background.body",
                    flex: 1,
                    maxWidth: 1200,
                    width: "100%",
                    mx: "auto",
                }}
            >
                <Typography level="h1" fontSize="xl2" sx={{mb: 1}}>
                    My profile
                </Typography>
                <Tabs
                    value={currentTab}
                    onChange={(event, value) => setCurrentTab(value as currentTabEnum)}
                    sx={{
                        bgcolor: "background.body",
                        "--Tab-height": "48px",
                    }}
                >
                    <Box
                        sx={{
                            "--_shadow-height": "16px",
                            height: 0,
                            position: "sticky",
                            top: "calc(var(--Tab-height) - var(--main-paddingTop, 0px) + var(--Header-height, 0px) - (var(--_shadow-height) / 2))",
                            zIndex: 1,
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "relative",
                                zIndex: 1,
                                height: "var(--_shadow-height)",
                                background:
                                    "radial-gradient(closest-side, rgba(0 0 0 / 0.12), transparent 100%)",
                            },
                        }}
                    />
                    <TabList
                        variant="plain"
                        size="sm"
                        sx={(theme) => ({
                            "--List-padding": "0px",
                            "--ListItem-minHeight": "var(--Tab-height)",
                            "--Chip-minHeight": "20px",
                            "--_TabList-bg": theme.vars.palette.background.body,
                            backgroundColor: "var(--_TabList-bg)",
                            boxShadow: `inset 0 -1px 0 0 ${theme.vars.palette.divider}`,
                            position: "sticky",
                            top: "calc(-1 * (var(--main-paddingTop, 0px) - var(--Header-height, 0px)))",
                            zIndex: 10,
                            width: "100%",
                            overflow: "auto hidden",
                            alignSelf: "flex-start",
                            borderRadius: 0,
                            scrollSnapType: "inline",
                            "&::after": {
                                pointerEvents: "none",
                                display: {xs: "block", sm: "none"},
                                content: '""',
                                position: "sticky",
                                top: 0,
                                width: 40,
                                flex: "none",
                                zIndex: 1,
                                right: 0,
                                borderBottom: "1px solid transparent",
                                background: `linear-gradient(to left, var(--_TabList-bg), rgb(0 0 0 / 0))`,
                                backgroundClip: "content-box",
                            },
                            "&::-webkit-scrollbar": {
                                width: 0,
                                display: "none",
                            },
                            [`& .${tabClasses.root}`]: {
                                "&:first-of-type": {
                                    ml: "calc(-1 * var(--ListItem-paddingX))",
                                },
                                scrollSnapAlign: "start",
                                bgcolor: "transparent",
                                boxShadow: "none",
                                flex: "none",
                                "&:hover": {
                                    bgcolor: "transparent",
                                },
                                [`&.${tabClasses.selected}`]: {
                                    color: "primary.plainColor",
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        zIndex: 1,
                                        bottom: 0,
                                        left: "var(--ListItem-paddingLeft)",
                                        right: "var(--ListItem-paddingRight)",
                                        height: "2px",
                                        bgcolor: "primary.500",
                                    },
                                    [`& .${chipClasses.root}`]: theme.variants.solid.primary,
                                },
                            },
                        })}
                    >
                        <Tab value={currentTabEnum.AccountSetting}>Account settings</Tab>
                        <Tab value={currentTabEnum.Billing}>
                            Billing
                            <Chip size="sm" variant="soft" color="neutral" sx={{ml: 1}}>
                                {props.user?.payments?.length || 0}
                            </Chip>
                        </Tab>
                    </TabList>
                </Tabs>
                {currentTab === currentTabEnum.Billing && props.user.payments && (props.user.payments.length >= 1 ?
                    <BillingCard user={props.user}/> :
                    <Typography level="h6" sx={{marginTop: "1rem"}}>No payments Yet</Typography>)}
                {currentTab === currentTabEnum.AccountSetting && (
                    <Box
                        sx={{
                            pt: 3,
                            pb: 10,
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "100%",
                                sm: "minmax(120px, 30%) 1fr",
                                lg: "280px 1fr minmax(120px, 208px)",
                            },
                            columnGap: {xs: 2, sm: 3, md: 4},
                            rowGap: {xs: 2, sm: 2.5},
                            "& > hr": {
                                gridColumn: "1/-1",
                            },
                        }}
                    >
                        <FormLabel sx={{display: {xs: "none", sm: "block"}}}>
                            Name
                        </FormLabel>
                        <Box sx={{display: {xs: "contents", sm: "flex"}, gap: 2}}>
                            <FormControl sx={{flex: 1}}>
                                <FormLabel sx={{display: {sm: "none"}}}>
                                    First username
                                </FormLabel>
                                <Input
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setNameState(() => event.target.value);
                                    }}
                                    placeholder="first username"
                                    value={usernameState}
                                />
                            </FormControl>

                        </Box>

                        <Divider role="presentation"/>

                        <FormControl sx={{display: {sm: "contents"}}}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setEmailState(() => event.target.value);
                                }}
                                type="email"
                                startDecorator={<MailOutlinedIcon/>}
                                placeholder="email"
                                // value={data.email}
                                value={emailState}
                            />
                        </FormControl>

                        <Divider role="presentation"/>

                        <Box>
                            <FormLabel>Your photo</FormLabel>
                            <FormHelperText>
                                This will be displayed on your profile.
                            </FormHelperText>
                            {imageLinkState && (
                                <Avatar
                                    size="lg"
                                    src={imageLinkState}
                                    sx={{"--Avatar-size": "64px", marginTop: "1rem"}}
                                />
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                gap: 2.5,
                            }}
                        >
                            <DropZone uploadHandler={setImageLinkState}/>
                        </Box>

                        <Divider role="presentation"/>
                        <Box> <FormLabel>Bio</FormLabel></Box>

                        <Stack sx={{alignItems: "center", justifyContent: "center"}}>
                            {editor ? <EditableRichTextEditor editor={editor}/> :
                                <CircularProgress/>}
                        </Stack>


                        <Divider role="presentation"/>

                        <Box
                            sx={{
                                gridColumn: "1/-1",
                                justifySelf: "flex-end",
                                display: "flex",
                                gap: 1,
                            }}
                        >
                            <Button
                                variant="outlined"
                                color="success"
                                size="sm"
                                onClick={cancelHandling}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" size="sm"
                                // disabled={isSameState}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                )}
            </Sheet>
        </form>
    );
};
