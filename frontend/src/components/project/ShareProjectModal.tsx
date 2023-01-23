import {
    Avatar,
    Box,
    Divider,
    FormControl,
    IconButton,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React from "react";
import { icons } from "../../assets/icons";
import { closeShareProjectModal } from "../../reduxApp/features/modals/modal-slice";
import {
    useAppDispatch,
    useAppSelector,
    useInviteProjectMember,
} from "../../reduxApp/hooks";
import TransitionModal from "../custom/TransitionModal";
import * as yup from "yup";
import { Formik } from "formik";

type ShareProjectFormValues = {
    email: string;
    message?: string;
};

const initialValues: ShareProjectFormValues = {
    email: "",
    message: "",
};
const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    message: yup.string(),
});

const ShareProjectModal: React.FC = () => {
    const { open } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(closeShareProjectModal());
    };
    const projectData = useAppSelector(
        (state) => state.currentProject.projectData
    );
    const inviteUser = useInviteProjectMember();
    const handleFormSubmit = (values: ShareProjectFormValues) => {
        console.log(values);
        inviteUser(values.email, values.message ? values.message : "");
        handleClose();
    };
    return (
        <TransitionModal open={open} onClose={handleClose}>
            <Box width="450px" padding={"25px"}>
                <Box
                    display={"flex"}
                    justifyContent="space-between"
                    alignItems={"center"}
                    width="100%"
                >
                    <Box
                        display={"flex"}
                        justifyContent="space-between"
                        alignItems={"center"}
                        width="30%"
                    >
                        <Avatar
                            sx={{
                                background: "white",
                                height: "40px",
                                width: "40px",
                            }}
                        >
                            {projectData && projectData.icon
                                ? icons[projectData.icon]({
                                      color: projectData.color,
                                      height: "40px",
                                      width: "40px",
                                  })
                                : icons.folder({
                                      height: "40px",
                                      width: "40px",
                                  })}
                        </Avatar>
                        <Typography variant="h6" fontWeight={"bold"}>
                            {projectData?.title}
                        </Typography>
                    </Box>
                    <Box>
                        <Tooltip title="Close">
                            <IconButton onClick={handleClose}>
                                {icons.close()}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={{ marginTop: "40px" }}>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{ mt: 1 }}
                            >
                                <FormControl
                                    fullWidth
                                    sx={{ marginBottom: "10px" }}
                                >
                                    <label htmlFor="email">
                                        Share the project with others
                                    </label>

                                    <TextField
                                        margin="normal"
                                        required
                                        id="email"
                                        placeholder="Enter email address"
                                        name="email"
                                        autoFocus
                                        error={
                                            touched.email &&
                                            Boolean(errors.email)
                                        }
                                        helperText={
                                            touched.email && errors.email
                                        }
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <Divider />
                                <FormControl
                                    fullWidth
                                    sx={{ marginTop: "10px" }}
                                >
                                    <label htmlFor="message">
                                        Include a personal message with your
                                        invitation
                                    </label>
                                    <TextField
                                        margin="normal"
                                        multiline
                                        rows={5}
                                        id="message"
                                        name="message"
                                        placeholder="This is optional."
                                        error={
                                            touched.message &&
                                            Boolean(errors.message)
                                        }
                                        helperText={
                                            touched.message && errors.message
                                        }
                                        value={values.message}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                                <Box textAlign={"right"}>
                                    <button type="submit" className="btn">
                                        Invite
                                    </button>
                                </Box>
                            </Box>
                        )}
                    </Formik>
                </Box>
            </Box>
        </TransitionModal>
    );
};

export default ShareProjectModal;
