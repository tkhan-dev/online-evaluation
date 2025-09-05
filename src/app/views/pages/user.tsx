// UserManagement.tsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import userService from "../../../services/userService";
import {User} from '../../../models/userModel';
import Button from "../../../base-components/Button";


const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleEdit = (userId: number) => {
    navigate(`/user-personal-info/${userId}`);
  };




  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      console.log("Users from service:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table className="border border-gray-300">
            <TableHead className="bg-gray-200 !font-bold">
              <TableRow>
                <TableCell className="border border-gray-300"><span className="s1 text-primary-color">Name</span></TableCell>
                <TableCell className="border border-gray-300"><span className="s1 text-primary-color">Email</span></TableCell>
                <TableCell className="border border-gray-300"><span className="s1 text-primary-color">Mobile</span></TableCell>
                <TableCell className="border border-gray-300"><span className="s1 text-primary-color">College</span></TableCell>
                <TableCell className="border border-gray-300"><span className="s1 text-primary-color">Status</span></TableCell>
                <TableCell className="border border-gray-300"><span className="s1 text-primary-color">Actions</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.userId}  className="hover:bg-gray-400">
                    <TableCell className="border border-gray-300">{user.name}</TableCell>
                    <TableCell className="border border-gray-300">{user.email}</TableCell>
                    <TableCell className="border border-gray-300">{user.mobileNumber}</TableCell>
                    <TableCell className="border border-gray-300">{user.collegeName}</TableCell>
                    <TableCell className="border border-gray-300">
                      <span
                        className={
                          user.isActive ? "text-success-color" : "text-warning-color"
                        }
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
               <Link
    to={`/user-personal-info/${user.userId}`}
    className="text-blue-600 hover:underline"
  >
    Edit
  </Link>
         
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UserManagement;
