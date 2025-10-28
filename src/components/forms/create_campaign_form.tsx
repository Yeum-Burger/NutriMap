import {useContext, useState} from "react";
import {
    Box,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Chip,
} from "@mui/material";
import type { CreateCampaignFormData, TaskDraft } from "../../interfaces/interfaces.ts";
import {mobile_context} from "../../mobile_context";
import Notification from "../notification.tsx";
import { createCampaign } from "../../services/campaign_service.ts";
import { useAuth } from "../../services/auth_service.tsx";

interface FormErrors {
    title?: string;
    description?: string;
    task?: string;
    task_quota?: string;
    task_desc?: string;
}

function CreateCampaignForm() {
    const is_mobile = useContext(mobile_context)
    const { user } = useAuth()
    const [notification, setNotification] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
    const [form_data, setFormData] = useState<CreateCampaignFormData>({
        title: "",
        description: "",
        organization_id: user?.id ?? 0,
        task: [],
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [taskInputEnabled, setTaskInputEnabled] = useState(false);
    const [taskInput, setTaskInput] = useState("");
    const [taskQuota, setTaskQuota] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddTaskClick = () => {
        const trimmedName = taskInput.trim();
        const trimmedQuota = taskQuota.trim();
        const trimmedDescription = taskDescription.trim();

        if (!trimmedName || !trimmedQuota || !trimmedDescription) {
            setErrors(prev => ({
                ...prev,
                task: "Task name, quota, and description are required",
            }));
            return;
        }

        const newTask: TaskDraft = {
            task_name: trimmedName,
            volunteer_quota: parseInt(trimmedQuota),
            task_description: trimmedDescription,
            start_date: new Date().toISOString(),
        };

        setFormData(prev => ({
            ...prev,
            task: [...prev.task, newTask],
        }));

        setTaskInput("");
        setTaskQuota("");
        setTaskDescription("");
        setErrors(prev => ({ ...prev, task: undefined }));
    };

    const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTaskClick();
        }
    };

    const handleDeleteTask = (taskToDelete: TaskDraft) => {
        setFormData(prev => ({
            ...prev,
            task: prev.task.filter(task => task.task_name !== taskToDelete.task_name),
        }));
    };

    const handle_submit = async () => {
        const newErrors: FormErrors = {};

        if (!form_data.title.trim()) newErrors.title = "This field is required";
        if (!form_data.description.trim()) newErrors.description = "This field is required";

        if (taskInputEnabled && form_data.task.length === 0) {
            newErrors.task = "Please add at least one task";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            const campaignDataToSubmit = {
                ...form_data,
                organization_id: user?.id ?? 0
            };
            await createCampaign(campaignDataToSubmit);
            setNotification({ open: true, message: "Campaign submitted for proposal!", severity: "success" });
            setFormData({
                title: "",
                description: "",
                organization_id: user?.id ?? 0,
                task: [],
            });
            setTaskInputEnabled(false);
        } catch (error) {
            console.error("Error creating campaign:", error);
            setNotification({ open: true, message: "Failed to create campaign. Please try again.", severity: "error" });
        }
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: is_mobile ? "column" : "row",
                gap: 2
            }}>
                <Box sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: 2
                }}>
                    <TextField
                        name="title"
                        label="Campaign Title"
                        value={form_data.title}
                        onChange={handle_change}
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        multiline
                        minRows={3}
                        value={form_data.description}
                        onChange={handle_change}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </Box>

                <Box sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: 2
                }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={taskInputEnabled}
                                onChange={() => setTaskInputEnabled(prev => !prev)}
                            />
                        }
                        label="Enable Task Input"
                    />

                    <TextField
                        label="Task Name"
                        value={taskInput}
                        onChange={e => {
                            setTaskInput(e.target.value);
                            if (errors.task) setErrors(prev => ({ ...prev, task: undefined }));
                        }}
                        onKeyDown={handleAddTask}
                        disabled={!taskInputEnabled}
                        error={!!errors.task}
                    />
                    <TextField
                        label="Task Quota"
                        value={taskQuota}
                        onChange={e => {
                            const value = e.target.value;
                            if (value === '' || /^[0-9]\d*$/.test(value)) {
                                setTaskQuota(value);
                            }
                            if (errors.task_quota) setErrors(prev => ({ ...prev, task_quota: undefined }));
                        }}
                        onKeyDown={handleAddTask}
                        disabled={!taskInputEnabled}
                        error={!!errors.task_quota}
                    />
                    <TextField
                        label="Task Description"
                        value={taskDescription}
                        onChange={e => {
                            setTaskDescription(e.target.value);
                            if (errors.task_desc) setErrors(prev => ({ ...prev, task_desc: undefined }));
                        }}
                        onKeyDown={handleAddTask}
                        disabled={!taskInputEnabled}
                        error={!!errors.task_desc}
                    />

                    <Button
                        variant="outlined"
                        onClick={handleAddTaskClick}
                        disabled={!taskInputEnabled}
                        fullWidth
                    >
                        Add Task
                    </Button>

                    {errors.task && (
                        <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: -1 }}>
                            {errors.task}
                        </Box>
                    )}

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {form_data.task.map((task, index) => (
                            <Chip
                                key={index}
                                label={`${task.task_name} (${task.volunteer_quota})`}
                                onDelete={() => handleDeleteTask(task)}
                                color="primary"
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Button onClick={handle_submit} fullWidth>
                Submit for Proposal
            </Button>
            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={() => setNotification({ ...notification, open: false })}
            />
        </Box>
    );
}

export default CreateCampaignForm;