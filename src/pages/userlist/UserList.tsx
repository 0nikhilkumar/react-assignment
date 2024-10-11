import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import ToastMessage from '../../components/ToastMessage';
import UserCreateModal from '../modalPopup/UserCreateModal';
import UserEditPopup from '../modalPopup/UserEditPopup';
import UserViewModal from '../modalPopup/UserViewModal';
import ListData from './ListData';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const UserList: React.FC = () => {
  const [userDatas, setUserDatas] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [viewUserData, setViewUserData] = useState<User | null>(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUserData, setEditUserData] = useState<User | null>(null);

  const [editUsersForm, setEditUsersForm] = useState<User[] | null>({
    id: '',
    name: '',
    email: '',
    phone: '',
  });

  const getAllUser = () => {
    setIsLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length === 0) {
            setIsLoading(false);
            setMessage('No user found!!');
          } else {
            setIsLoading(false);
            setUserDatas(response.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage('Something went wrong!!');
      });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const loadUserDetail = (userData: User) => {
    setViewUserData(userData);
    setViewModalShow(true);
  };

  const deleteUser = (userId: number) => {
    if (window.confirm('Do you want to delete this user?')) {
      const updatedUserList = userDatas?.filter((user) => user.id !== userId);
      toast.error('Deleted successfully!', {
        position: 'top-right',
      });
      setUserDatas(updatedUserList || null);
    }
  };

  const editButtonClick = (userData: User) => {
    setEditModalShow(true);
    setEditUserData(userData);
  };

  useEffect(() => {
    if (editUserData) {
      setEditUsersForm({
        id: editUserData.id.toString(),
        name: editUserData.name,
        email: editUserData.email,
        phone: editUserData.phone,
      });
    }
  }, [editUserData]);

  return (
    <div className="container">
      <ToastMessage />

      {/* Modal */}
      <UserCreateModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        userDatas={userDatas}
        setUserDatas={setUserDatas}
      />

      <UserViewModal
        viewModalShow={viewModalShow}
        viewUserData={viewUserData}
        setViewModalShow={setViewModalShow}
      />

      <UserEditPopup
        userDatas={userDatas}
        setUserDatas={setUserDatas}
        editModalShow={editModalShow}
        setEditModalShow={setEditModalShow}
        editUserData={editUserData}
        editUsersForm={editUsersForm}
        setEditUsersForm={setEditUsersForm}
      />

      {/* Modal End */}
      <div className="card">
        <div className="card-title">
          <h1>
            User List{' '}
            <button
              onClick={() => setModalShow(true)}
              className="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Add New (+)
            </button>
          </h1>
          <div className="card-body">
            {isLoading ? (
              <Loader />
            ) : message ? (
              <h2>{message}</h2>
            ) : userDatas && userDatas.length === 0 ? (
              <h2>No user found!!</h2>
            ) : (
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>ID</td>
                    <td>Employee Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td colSpan={2}>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {userDatas &&
                    userDatas.map((user) => (
                      <ListData
                        user={user}
                        key={user.id}
                        deleteUser={deleteUser}
                        loadUserDetail={loadUserDetail}
                        editButtonClick={editButtonClick}
                      />
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
