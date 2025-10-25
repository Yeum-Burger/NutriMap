import { Box, Typography, Breadcrumbs, Link, IconButton } from "@mui/material";
import { Outlet, useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { ArrowBackIosOutlined } from "@mui/icons-material";
import theme from "../../theme.ts";

// Map route segments to custom titles
const TITLE_MAP: Record<string, string> = {
    'campaign': 'Campaign Information',
    'application': 'Application Details',
    'volunteer-applications': 'Volunteer Applications',
    'settings': 'Settings',
    'profile': 'Profile',
    'dashboard': 'Dashboard'
};

function DashboardOutlet() {
    const location = useLocation();
    const navigate = useNavigate();

    const pathSegments = location.pathname.split("/").filter(Boolean);

    // Check if a segment is an ID (UUID or custom ID pattern)
    const isId = (str: string) => {
        return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(str) || // UUID
            /^[a-z]+-[0-9]+$/i.test(str); // Pattern like "app-001", "vol-123"
    };

    const lastSegment = pathSegments[pathSegments.length - 1];
    const secondLastSegment = pathSegments[pathSegments.length - 2];

    // Determine page title
    let pageTitle = "Dashboard";
    if (lastSegment && isId(lastSegment) && secondLastSegment) {
        // If last segment is an ID, use the segment before it
        pageTitle = TITLE_MAP[secondLastSegment] || formatSegment(secondLastSegment);
    } else if (lastSegment) {
        // Normal segment
        pageTitle = TITLE_MAP[lastSegment] || formatSegment(lastSegment);
    }

    // Create breadcrumbs (exclude IDs)
    const breadcrumbs = pathSegments
        .filter(segment => !isId(segment))
        .map((segment, index, filtered) => {
            const originalIndex = pathSegments.indexOf(segment);
            const path = "/" + pathSegments.slice(0, originalIndex + 1).join("/");

            const label = TITLE_MAP[segment] || formatSegment(segment);
            const isLast = index === filtered.length - 1;

            return isLast ? (
                <Typography key={path} color="text.primary">
                    {label}
                </Typography>
            ) : (
                <Link
                    key={path}
                    component={RouterLink}
                    to={path}
                    underline="hover"
                    color="inherit"
                >
                    {label}
                </Link>
            );
        });

    const isDashboardRoot = location.pathname === "/dashboard";

    return (
        <Box sx={{ p: '2.5%' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 2,
                mb: 3
            }}>
                {!isDashboardRoot && (
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{
                            mt: 1,
                            color: theme.palette.primary.main,
                            backgroundColor: 'transparent',
                            border: 'none',
                            '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        }}
                    >
                        <ArrowBackIosOutlined />
                    </IconButton>
                )}

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h2" fontWeight={600}>
                        {pageTitle}
                    </Typography>
                    {!isDashboardRoot && (
                        <Breadcrumbs separator="›" sx={{ mt: 1 }}>
                            {breadcrumbs}
                        </Breadcrumbs>
                    )}
                </Box>
            </Box>
            <Outlet />
        </Box>
    );
}

function formatSegment(segment: string): string {
    return segment
        .replace(/-/g, " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default DashboardOutlet;