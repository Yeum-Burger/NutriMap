import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import {useContext, useState} from "react";
import type {JoinOrganizationFormData} from "../../interfaces/interfaces.ts";
import {mobile_context} from "../../mobile_context.ts";
import Notification from "../notification.tsx";
import {createOrganization} from "../../services/user_service.ts";


interface FormErrors {
    organization_name?: string;
    address?: string;
    email?: string;
}

function OrganizationForm() {
    const is_mobile = useContext(mobile_context);
    const [notification, setNotification] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
    const [form_data, setFormData] = useState<JoinOrganizationFormData>({
        organization_name: "",
        address: "",
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

        if (!form_data.organization_name.trim()) newErrors.organization_name = "This field is required";
        if (!form_data.address.trim()) newErrors.address = "This field is required";

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
            await createOrganization(form_data);
            setNotification({ open: true, message: "Organization account created successfully!", severity: "success" });
            setFormData({ organization_name: "", address: "", email: "" });
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
                        subheader={'Enter your details'}
            />
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}>
                <TextField name={'organization_name'}
                           label={'Organization Name'}
                           type={'text'}
                           error={!!errors.organization_name}
                           helperText={errors.organization_name}
                           value={form_data.organization_name}
                           onChange={handle_change}
                />
                <TextField name={'address'}
                           label={'Address'}
                           type={'text'}
                           error={!!errors.address}
                           helperText={errors.address}
                           value={form_data.address}
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
export default OrganizationForm