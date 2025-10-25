import {RemoveRedEyeOutlined} from "@mui/icons-material";
import {Box, Button, Card, List, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import type {Organization} from "../../interfaces/interfaces.ts";
import {getOrganizationIDs, getUserByID} from "../../services/user_service.ts";

function A_OrganizationManager() {
    const [ids, setIds] = useState<string[] | null>(null);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const navigate = useNavigate();
    const handle_click = (id: string) => {
        navigate(`${id}`)
    }

    useEffect(() => {
        async function fetchOrganizationIDs() {
            try {
                const response = await getOrganizationIDs();
                setIds(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchOrganizationIDs();
    }, []);
    useEffect(() => {
        if (!ids || ids.length === 0) return;

        async function fetchUsers() {
            if (!ids) return;
            try {
                const responses = await Promise.all(ids.map(id => getUserByID(id)));
                const orgs = responses.map(res => res.data);
                setOrganizations(orgs);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUsers();
    }, [ids]);

    if (!ids) return null;
    const _organizations = organizations.map((org) => (
        <Card key={org.id} sx={{
            m: 1,
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
        }}>
            <Typography variant="h6">{org.organization_name}</Typography>
            <Typography variant="body2">{org.email}</Typography>
            <Button
                onClick={() => handle_click(org.id)}
                fullWidth
                sx={{
                    display: 'flex',
                    gap: 1
                }}>
                <RemoveRedEyeOutlined />
                View
            </Button>
        </Card>
    ))

    return (
        <Box>
            <List>
                {_organizations}
            </List>
        </Box>
    );
}

export default A_OrganizationManager;
