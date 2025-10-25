import {ErrorOutlineOutlined} from "@mui/icons-material";
import {Button, Card, CardActions, CardContent, CardHeader, TextField, Typography} from "@mui/material"
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import type {LogInFormData} from "../../interfaces/interfaces.ts";
import {mobile_context} from "../../main.tsx";
import {useAuth} from "../../services/auth_service.tsx";
import { PATHS } from "../../PATHS.ts";

interface FormErrors {
    email?: string;
    password?: string;
}

function LogInForm() {
    const is_mobile = useContext(mobile_context)
    const { log_in, logged_in } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        console.log(logged_in);
        if (logged_in) {
            navigate(PATHS.DASHBOARD);
        }
    }, [logged_in]);

    const [log_in_error, setLogInError] = useState<string>("");
    const [form_data, setFormData] = useState<LogInFormData>({
        email: "",
        password: "",
    })
    const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({... form_data, [e.target.name]: e.target.value })
    }

    const [errors, setErrors] = useState<FormErrors>({})
    const handle_submit = async () => {
        const newErrors: FormErrors = {}
        setLogInError('')

        if (!form_data.email.trim()) {
            newErrors.email = "This field is required";
        } else {
            // Regex for email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(form_data.email)) {
                newErrors.email = "Invalid email address";
            }
        }
        if (!form_data.password.trim()) newErrors.password = "This field is required";

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0)
            return;

        // All fields are valid, proceed
        console.log("Form submitted:", form_data);
        try {
            await log_in(form_data);
        } catch (error: any) {
            setLogInError(error.message);
        }
    }


    return (
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            width: is_mobile ? "75%" : "50%",
        }}>
            <CardHeader title={'Welcome Back!'}
                        subheader={'Enter your log in details'}
            />
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}>
                {log_in_error && (
                    <Typography color="error" variant="body2" sx={{
                        p: 1,
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        border: '1px solid red',
                    }}>
                        <ErrorOutlineOutlined />
                        {log_in_error}
                    </Typography>
                )}
                <TextField name={'email'}
                           label={'Email'}
                           type={'email'}
                           error={!!errors.email}
                           helperText={errors.email}
                           value={form_data.email}
                           onChange={handle_change}
                />
                <TextField name={'password'}
                           label={'Password'}
                           type={'password'}
                           error={!!errors.password}
                           helperText={errors.password}
                           value={form_data.password}
                           onChange={handle_change}
                />
            </CardContent>
            <CardActions>
                <Button fullWidth
                        onClick={handle_submit}
                >
                    Log In
                </Button>
            </CardActions>
        </Card>
    )
}
export default LogInForm