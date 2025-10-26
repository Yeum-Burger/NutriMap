import {Box, Toolbar} from "@mui/material"
import {Route, Routes} from "react-router-dom";
import Footer from "./components/footer/footer.tsx";
import NavBar from "./components/navbar/navbar.tsx";
import {ProtectedRoute, PublicOnlyRoute, RoleBasedRoute} from "./components/protected_routes.tsx";
import Join from "./pages/auth_page/join_page/join.tsx";
import LogIn from "./pages/auth_page/log_in_page/login.tsx";
import A_CampaignInfo from "./pages/campaign_info/a_campaign_info.tsx";
import ApplicationInfo from "./pages/campaign_info/application_info.tsx";
import CampaignInfo from "./pages/campaign_info/campaign_info.tsx";
import O_CampaignInfo from "./pages/campaign_info/o_campaign_info.tsx";
import A_OrganizationInfo from "./pages/campaign_info/organization_info.tsx";
import A_CampaignManager from "./pages/campaign_manager/a_campaign_manager.tsx";
import A_OrganizationManager from "./pages/campaign_manager/a_organization_manager.tsx";
import O_CampaignManager from "./pages/campaign_manager/o_campaign_manager.tsx";
import CreateCampaign from "./pages/create_campaign/create_campaign.tsx";
import AdminDashboard from "./pages/dashboard/admin_dashboard/a_dashboard.tsx";
import DashboardOutlet from "./pages/dashboard/dashboard_outlet.tsx";
import OrganizationDashboard from "./pages/dashboard/organization_dashboard/o_dashboard.tsx";
import VolunteerDashboard from "./pages/dashboard/volunteer_dashboard/v_dashboard.tsx";
import LandingPage from "./pages/landing_page/landing_page.tsx";
import {PATHS, USER_TYPES} from "./PATHS.ts";
import {AuthProvider, useAuth} from "./services/auth_service.tsx";

function AppRoutes() {
    const { user_type } = useAuth();
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
        }}>
            <NavBar />
            <Toolbar />

            <Box sx={{ flexGrow: 1 }}>
                <Routes>
                    {/* Public Routes */}
                    <Route path={PATHS.HOME} element={<LandingPage />} />

                    {/* Auth Routes */}
                    <Route path={PATHS.LOGIN} element={
                        <PublicOnlyRoute><LogIn /></PublicOnlyRoute>
                    } />
                    <Route path={PATHS.JOIN} element={
                        <PublicOnlyRoute><Join /></PublicOnlyRoute>
                    } />

                    {/* Protected Dashboard */}
                    <Route path={PATHS.DASHBOARD} element={
                        <ProtectedRoute><DashboardOutlet /></ProtectedRoute>
                    }>
                        {/* Volunteer Routes */}
                        <Route
                            index
                            element={
                                user_type === USER_TYPES.VOLUNTEER ? (
                                    <RoleBasedRoute allowedType={USER_TYPES.VOLUNTEER}>
                                        <VolunteerDashboard />
                                    </RoleBasedRoute>
                                ) : user_type === USER_TYPES.ORGANIZATION ? (
                                    <RoleBasedRoute allowedType={USER_TYPES.ORGANIZATION}>
                                        <OrganizationDashboard />
                                    </RoleBasedRoute>
                                ) : (
                                    <RoleBasedRoute allowedType={USER_TYPES.ADMIN}>
                                        <AdminDashboard />
                                    </RoleBasedRoute>
                                )
                            }
                        />
                            <Route path={`${PATHS.CAMPAIGN_INFO}/:id`} element={
                                <RoleBasedRoute allowedType={USER_TYPES.VOLUNTEER}>
                                    <CampaignInfo />
                                </RoleBasedRoute>
                            } />
                            <Route path={`${PATHS.APPLICATION_INFO}/:id`} element={
                                <RoleBasedRoute allowedType={USER_TYPES.VOLUNTEER}>
                                    <ApplicationInfo />
                                </RoleBasedRoute>
                            } />

                            {/* Organization Routes */}
                            <Route path={PATHS.CAMPAIGN_MANAGER} element={
                                <RoleBasedRoute allowedType={USER_TYPES.ORGANIZATION}>
                                    <O_CampaignManager />
                                </RoleBasedRoute>
                            } />
                            <Route path={`${PATHS.CAMPAIGN_MANAGER}/:id`} element={
                                <RoleBasedRoute allowedType={USER_TYPES.ORGANIZATION}>
                                    <O_CampaignInfo />
                                </RoleBasedRoute>
                            } />
                            <Route path={PATHS.CREATE_CAMPAIGN} element={
                                <RoleBasedRoute allowedType={USER_TYPES.ORGANIZATION}>
                                    <CreateCampaign />
                                </RoleBasedRoute>
                            } />

                            {/* Admin Routes */}
                            <Route path={PATHS.A_CAMPAIGN_MANAGER} element={
                                <RoleBasedRoute allowedType={USER_TYPES.ADMIN}>
                                    <A_CampaignManager />
                                </RoleBasedRoute>
                            } />
                            <Route path={`${PATHS.A_CAMPAIGN_MANAGER}/:id`} element={
                                <RoleBasedRoute allowedType={USER_TYPES.ADMIN}>
                                    <A_CampaignInfo />
                                </RoleBasedRoute>
                            } />
                            <Route path={PATHS.A_ORG_MANAGER} element={
                                <RoleBasedRoute allowedType={USER_TYPES.ADMIN}>
                                    <A_OrganizationManager />
                                </RoleBasedRoute>
                            } />
                            <Route path={`${PATHS.A_ORG_MANAGER}/:id`} element={
                                <RoleBasedRoute allowedType={USER_TYPES.ADMIN}>
                                    <A_OrganizationInfo />
                                </RoleBasedRoute>
                            } />
                        </Route>
                    </Routes>
                </Box>

                <Footer />
            </Box>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default App