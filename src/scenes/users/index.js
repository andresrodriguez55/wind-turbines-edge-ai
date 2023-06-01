import React from 'react';
import {
  Box,
  useTheme,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import { getUser } from '../../utils/user';

import { backendUrls } from '../../utils/urls';
import API from '../../utils/api';

export default function Users() 
{
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [disableButton, setDisableButton] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [creatingUser, setCreatingUser] = React.useState(true);
  const [formData, setFormData] = React.useState({
    id: null,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: ""
  });

  const handleClickOpen = () => 
  {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => 
  {
    setCreatingUser(true);
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: ""
    });
    handleClickOpen();
  };

  const handleEdit = (e, user) => 
  {
    e.preventDefault();
    setSelectedUser(user);
    setCreatingUser(false);
    setFormData({
      id: user.id,
      email: user.email,
      password: "",
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    });
    handleClickOpen();
  };

  const handleSubmitPost = async (e, user) => 
  {
    setDisableButton(true);

    var result = window.confirm("Are you sure you want to post the user with the email " + user?.email + "?");
    if (!result) 
    {
      setDisableButton(false);
      return;
    }

    const urlToFetch = backendUrls.postUser;
    try 
    {
      const json = await API.post(urlToFetch, APIheaders, user);
      alert(user?.email + " created!");
      fetchUsers();
    } 
    catch (error) 
    {
      console.log('Database connection error...');
    }

    setDisableButton(false);
  };

  const handleSubmitUpdate = async (e, user) => 
  {

    setDisableButton(true);

    var result = window.confirm("Are you sure you want to update the user with the email " + user?.email + "?");
    if (!result) 
    {
      setDisableButton(false);
      return;
    }

    const URLToFetch = backendUrls.putUser(user?.id);
    try 
    {
      const json = await API.put(URLToFetch, APIheaders, user);
      alert(user?.email + " update!");
      fetchUsers();
    } 
    catch (error) 
    {
      console.log('Database connection error...');
    }

    setDisableButton(false);
  };

  const handleSubmitDelete = async (e, user) => 
  {
    e.preventDefault();
    setDisableButton(true);

    var result = window.confirm("Are you sure you want to delete the user with the email " + user?.email + "?");
    if (!result) 
    {
      setDisableButton(false);
      return;
    }

    const URLToFetch = backendUrls.deleteUser(user?.id);
    try 
    {
      await API.delete(URLToFetch, APIheaders);
      alert(user?.email + " deleted!");
      fetchUsers();
    } 
    catch (error) 
    {
      console.log('Database connection error...');
    }

    setDisableButton(false);
  };

  const fetchUsers = async () => 
  {
    const urlToFetch = backendUrls.getUsers;
    try 
    {
      const jsonArray = await API.get(urlToFetch, APIheaders);
      setUsers(jsonArray);
    } 
    catch (error) 
    {
      console.log('Database connection error...');
    }
  };

  React.useEffect(() => 
  {
    fetchUsers();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const APIheaders = {
    'Content-Type': "application/json",
    'Accept': "*/*",
    'Authorization': getUser().token
  };

  const handleFormSubmit = (e, creatingUser) => 
  {
    (creatingUser) ? handleSubmitPost(e, formData) : handleSubmitUpdate(e, formData);
    // Handle form submission here
    // ...

    // Reset form data after submission
    setFormData({
      id: null,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: ""
    });

    // Close the dialog
    handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const columns = [
    { field: "email", headerName: "Email", resizable: true, flex: 1 },
    { field: "firstName", headerName: "First Name", resizable: true, flex: 1 },
    { field: "lastName", headerName: "Last Name", resizable: true, flex: 1 },
    { field: "role", headerName: "Role", resizable: true, flex: 1 },
    {
      field: "action", headerName: "Action", sortable: false, disableColumnMenu: true, flex: 1,
      renderCell: (info) => (
        <>
          <Button
            style={{
              backgroundColor: "#ffcc00",
              width: "48%",
              marginRight: "4%",
              padding: "3px 35px"
            }}
            variant="contained"
            type="submit"
            disabled={disableButton}
            onClick={(e) => handleEdit(e, info.row)}>
            Edit
          </Button>

          <Button
            style={{
              backgroundColor: "#e8605d",
              width: "48%",
              padding: "3px 35px",
            }}
            variant="contained"
            type="submit"
            disabled={disableButton}
            onClick={(e) => handleSubmitDelete(e, info.row)}>
            Delete
          </Button>
        </>
      )
    }
  ];

  if (users == null || users.length === 0)
    return (<div></div>);

  return (
    <Box m="20px">
      <Header title="Administrate Users" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid disableColumnResize={false} rows={users} columns={columns} />
        <Box sx={{ height: "5px" }} />

        
        <Box display="flex" justifyContent="end" mt="20px" />
         <Button
                color="secondary"
                variant="contained"
                onClick={handleCreate}
              >
                Create User
              </Button>
      </Box>
      <Box sx={{ height: "75px" }} />

      <UserDialog
          open={open}
          handleClose={handleClose}
          creatingUser={creatingUser}
          formData={formData}
          handleFormSubmit={e => handleFormSubmit(e, creatingUser)}
          handleInputChange={handleInputChange}
        />



    </Box>
  );
}

function UserDialog({ open, handleClose, creatingUser, formData, handleFormSubmit, handleInputChange }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{creatingUser ? "Create User" : "Edit User"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the user details below.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          required
          value={formData.password}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          required
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          required
          value={formData.lastName}
          onChange={handleInputChange}
        />

        <Box sx={{ height: "10px" }} />

        <Select
          margin="dense"
          id="role"
          name="role"
          label="Role"
          type='text'
          fullWidth
          required
          onChange={handleInputChange}
          value={formData.role}
        >
          <MenuItem value={"ANALYST"}>ANALYST</MenuItem>
          <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
          <MenuItem value={"TECHNICIAN"}>TECHNICIAN</MenuItem>
        </Select>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={()=>handleFormSubmit(creatingUser)} color="secondary">
          {creatingUser ? "Create" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}