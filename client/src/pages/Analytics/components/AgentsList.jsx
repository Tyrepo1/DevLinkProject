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
                            <TableCell>Time</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {agentData.map((agent, index) => (
                            <TableRow key={index}>
                            <TableCell>
                                <Avatar alt={agent.from} src={`https://ui-avatars.com/api/?name=${agent.from}`} />
                            </TableCell>
                            <TableCell onClick={() => handleAgentSelect(agent.from)}><Typography color={"primary"} className=' cursor-pointer'>{agent.from}</Typography></TableCell>
                            <TableCell>{agent.createdAt}</TableCell>
                            <TableCell>{agent.text}</TableCell>
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
