import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Card, CardContent, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom'



function AgentsList({agentData, handleAgentSelect}) {
const navigate = useNavigate()
  return (
    <Card>
        <CardContent>
            <Typography variant="h5" color="primary">
            Agents waiting to connect
            </Typography>
            <br/>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {agentData.map((agent, index) => (
                            <TableRow key={index}>
                            <TableCell>
                                <Avatar alt={agent.name} src={`https://ui-avatars.com/api/?name=${agent.name}`} />
                            </TableCell>
                            <TableCell onClick={() => handleAgentSelect(agent.name)}><Typography color={"primary"} >{agent.name}</Typography></TableCell>
                            <TableCell>{agent.company}</TableCell>
                            <TableCell>{agent.message}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
            </TableContainer>
        </CardContent>
    </Card>
    
  );
}

export default AgentsList;
