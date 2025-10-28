import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import {useContext, useState} from "react";
import type {JoinVolunteerFormData} from "../../interfaces/interfaces.ts";
import {mobile_context} from "../../mobile_context.ts";
import Notification from "../notification.tsx";
import {createVolunteer} from "../../services/user_service.ts";


interface FormErrors {
    f_name?: string;
    l_name?: string;
    email?: string;
}

function VolunteerForm() {
    const is_mobile = useContext(mobile_context);
    const [notification, setNotification] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
    const [form_data, setFormData] = useState<JoinVolunteerFormData>({
        f_name: "",
        l_name: "",
        email: "",
    })
    const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedForm = { ...form_data, [name]: value };
        setFormData(updatedForm);
    }

    const [errors, setErrors] = useState<FormErrors>({})
    const handle_submit = async () => {
        const newErrors: FormErrors = {};

        if (!form_data.f_name.trim()) newErrors.f_name = "This field is required";
        if (!form_data.l_name.trim()) newErrors.l_name = "This field is required";

        if (!form_data.email.trim()) {
            newErrors.email = "This field is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(form_data.email)) {
                newErrors.email = "Invalid email address";
            }
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            await createVolunteer(form_data);
            setNotification({ open: true, message: "Account created successfully!", severity: "success" });
            setFormData({ f_name: "", l_name: "", email: "" });
        } catch (error) {
            setNotification({ open: true, message: error instanceof Error ? error.message : "Failed to create account", severity: "error" });
        }
    };

    return (
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            width: is_mobile ? "75%" : "50%",
        }}>
            <CardHeader title={'Welcome to NutriMap!'}
                        subheader={'Please enter your details'}
            />
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}>
                <TextField name={'f_name'}
                           label={'First Name'}
                           type={'text'}
                           error={!!errors.f_name}
                           helperText={errors.f_name}
                           value={form_data.f_name}
                           onChange={handle_change}
                />
                <TextField name={'l_name'}
                           label={'Last Name'}
                           type={'text'}
                           error={!!errors.l_name}
                           helperText={errors.l_name}
                           value={form_data.l_name}
                           onChange={handle_change}
                />
                <TextField name={'email'}
                           label={'Email'}
                           type={'email'}
                           error={!!errors.email}
                           helperText={errors.email}
                           value={form_data.email}
                           onChange={handle_change}
                />
            </CardContent>
            <CardActions>
                <Button fullWidth
                        onClick={handle_submit}
                >
                    Create Account
                </Button>
            </CardActions>
            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={() => setNotification({ ...notification, open: false })}
            />
        </Card>
    )
}
export default VolunteerForm