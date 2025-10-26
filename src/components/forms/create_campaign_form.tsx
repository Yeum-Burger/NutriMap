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

interface FormErrors {
    name?: string;
    location?: string;
    date?: string;
    description?: string;
    task?: string;
}

function CreateCampaignForm() {
    const is_mobile = useContext(mobile_context)
    const [form_data, setFormData] = useState<CreateCampaignFormData>({
        name: "",
        location: "",
        date: new Date(),
        description: "",
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
            [name]: name === "date" ? new Date(value) : value,
        }));
    };

    const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();

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
                name: trimmedName,
                quota: trimmedQuota,
                description: trimmedDescription,
            };

            setFormData(prev => ({
                ...prev,
                task: [...prev.task, newTask],
            }));

            setTaskInput("");
            setTaskQuota("");
            setTaskDescription("");
            setErrors(prev => ({ ...prev, task: undefined }));
        }
    };


    const handleDeleteTask = (taskToDelete: TaskDraft) => {
        setFormData(prev => ({
            ...prev,
            task: prev.task.filter(task => task.name !== taskToDelete.name),
        }));
    };

    const handle_submit = async () => {
        const newErrors: FormErrors = {};

        if (!form_data.name.trim()) newErrors.name = "This field is required";
        if (!form_data.location.trim()) newErrors.location = "This field is required";
        if (!form_data.date || isNaN(form_data.date.getTime()))
            newErrors.date = "This field is required";
        if (!form_data.description.trim()) newErrors.description = "This field is required";

        if (taskInputEnabled && form_data.task.length === 0) {
            newErrors.task = "Please add at least one task";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        console.log("Form submitted:", form_data);
        // TODO: pass form_data to campaign creation service
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
                        name="name"
                        label="Campaign Name"
                        value={form_data.name}
                        onChange={handle_change}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        name="location"
                        label="Location"
                        value={form_data.location}
                        onChange={handle_change}
                        error={!!errors.location}
                        helperText={errors.location}
                    />
                    <TextField
                        name="date"
                        label="Date"
                        type="date"
                        value={form_data.date.toISOString().split("T")[0]}
                        onChange={handle_change}
                        error={!!errors.date}
                        helperText={errors.date}
                        InputLabelProps={{ shrink: true }}
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
                        helperText="Press Enter to add task"
                        error={!!errors.task}
                    />
                    <TextField
                        label="Task Quota"
                        value={taskQuota}
                        onChange={e => {
                            setTaskInput(e.target.value);
                            if (errors.task) setErrors(prev => ({ ...prev, task: undefined }));
                        }}
                        onKeyDown={handleAddTask}
                        disabled={!taskInputEnabled}
                        helperText="Press Enter to add task"
                        error={!!errors.task}
                    />
                    <TextField
                        label="Task Description"
                        value={taskDescription}
                        onChange={e => {
                            setTaskInput(e.target.value);
                            if (errors.task) setErrors(prev => ({ ...prev, task: undefined }));
                        }}
                        onKeyDown={handleAddTask}
                        disabled={!taskInputEnabled}
                        helperText="Press Enter to add task"
                        error={!!errors.task}
                    />

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {form_data.task.map((task, index) => (
                            <Chip
                                key={index}
                                label={`${task.name} (${task.quota})`}
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
        </Box>
    );
}

export default CreateCampaignForm;
