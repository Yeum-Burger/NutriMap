import {VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {Button, Card, CardActions, CardContent, CardHeader, IconButton, InputAdornment, TextField} from "@mui/material";
import {useContext, useState} from "react";
import type {JoinVolunteerFormData} from "../../interfaces/interfaces.ts";
import {mobile_context} from "../../mobile_context.ts";
import Notification from "../notification.tsx";


interface FormErrors {
    f_name?: string;
    l_name?: string;
    email?: string;
    password?: string;
    c_password?: string;
}

function VolunteerForm() {
    const is_mobile = useContext(mobile_context);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const [showPassword2, setShowPassword2] = useState(false);
    const togglePasswordVisibility2 = () => setShowPassword2(prev => !prev);
    const [notification, setNotification] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
    const [form_data, setFormData] = useState<JoinVolunteerFormData>({
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        c_password: "",
    })
    const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedForm = { ...form_data, [name]: value };
        setFormData(updatedForm);

        // Live password match check
        if (name === "c_password" || name === "password") {
            if (updatedForm.c_password && updatedForm.password !== updatedForm.c_password) {
                setErrors(prev => ({ ...prev, c_password: "Passwords do not match" }));
            } else {
                setErrors(prev => ({ ...prev, c_password: undefined }));
            }
        }
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
            // TODO: CHECK IF EMAIL IS IN USE ALREADY
        }
        if (!form_data.password.trim()) newErrors.password = "This field is required";
        if (!form_data.c_password.trim()) newErrors.c_password = "This field is required";


        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        console.log("Form submitted:", form_data);
        setNotification({ open: true, message: "Account created successfully!", severity: "success" });
        // TODO: PASS FORM DATA TO ACCOUNT CREATION SERVICE
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
                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password}
                    value={form_data.password}
                    onChange={handle_change}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility}
                                            edge="end"
                                            sx={{
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                color: 'black',
                                                '&: hover': {
                                                    color: 'black'
                                                }
                                }}>
                                    {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField name={'c_password'}
                           label={'Confirm Password'}
                           type={showPassword2 ? "text" : "password"}
                           error={!!errors.c_password}
                           helperText={errors.c_password}
                           value={form_data.c_password}
                           onChange={handle_change}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <IconButton onClick={togglePasswordVisibility2}
                                                   edge="end"
                                                   sx={{
                                                       backgroundColor: 'transparent',
                                                       border: 'none',
                                                       color: 'black',
                                                       '&: hover': {
                                                           color: 'black'
                                                       }
                                                   }}>
                                           {showPassword2 ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                       </IconButton>
                                   </InputAdornment>
                               ),
                           }}
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