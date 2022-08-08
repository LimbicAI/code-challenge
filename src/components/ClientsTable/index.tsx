import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Toolbar, Typography } from '@material-ui/core';
import { userDatabase } from '../LoginForm/index';
import { User } from '../../types/User';
import { useHistory } from 'react-router-dom';

const ClientsTable = () => {
  const history = useHistory();
  const clients = userDatabase.filter((user) => user.role === 'client');
  const goToUser = (user: User) => {
    history.push({pathname:'/client-details', state:{user}});
  };
  const EnhancedTableToolbar = () => {
    return (
      <Toolbar style={{ paddingLeft: 12 }}>
        <Typography variant="h4" id="tableTitle" component="h1">
          Clients
        </Typography>
      </Toolbar>
    );
  };
  return (
    <div>
      <EnhancedTableToolbar />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: '#F0F4FF' }}>
            <TableRow>
              <TableCell>Client Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients?.map((user: User) => (
              <TableRow key={user?.id} onClick={() => goToUser(user)}>
                <TableCell> {user.id} </TableCell>
                <TableCell> {user.name} </TableCell>
                <TableCell> {user.role} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClientsTable;
