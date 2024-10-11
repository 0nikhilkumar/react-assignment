import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ListDataProps {
  user: User;
  deleteUser: (id: number) => void;
  loadUserDetail: (user: User) => void;
  editButtonClick: (user: User) => void;
}

const ListData: React.FC<ListDataProps> = ({ user, deleteUser, loadUserDetail, editButtonClick }) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>

          <td>
            <button
              onClick={() => loadUserDetail(user)}
              type="button"
              className="btn btn-info"
            >
              View
            </button>{' '}
            &nbsp;
            <button
              onClick={() => editButtonClick(user)}
              type="button"
              className="btn btn-warning"
            >
              Edit
            </button>{' '}
            &nbsp;
            <button
              onClick={() => deleteUser(user.id)}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default ListData;
