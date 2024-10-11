import axios from 'axios';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserEditPopupProps {
  userDatas: User[];
  setUserDatas: User;
  editModalShow: boolean;
  setEditModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  editUserData: User | null;
  editUsersForm: User;
  setEditUsersForm: User;
}

const UserEditPopup: React.FC<UserEditPopupProps> = ({
  userDatas,
  setUserDatas,
  editModalShow,
  setEditModalShow,
  editUserData,
  editUsersForm,
  setEditUsersForm,
}) => {
  const [editMessage, setEditMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {}, [editUsersForm, userDatas]);

  const handleClose = () => setEditModalShow(false);

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditUsersForm({
      ...editUsersForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = () => {
    if (!editUsersForm.name || !editUsersForm.email || !editUsersForm.phone) {
      setSuccess(false);
      setEditMessage('Please fill all the fields!');
      setTimeout(() => {
        setEditMessage('');
      }, 1500);
    } else {
      const formData = {
        name: editUsersForm.name,
        email: editUsersForm.email,
        phone: editUsersForm.phone,
      };

      axios
        .put(`https://jsonplaceholder.typicode.com/users/${editUserData?.id}`, formData)
        .then((data) => {
          if (data.status === 200) {
            const updatedUser = userDatas.map((eData) => {
              if (eData.id === editUserData?.id) {
                return {
                  ...eData,
                  ...formData,
                };
              }
              return eData;
            });

            setUserDatas(updatedUser);
            setSuccess(true);
            toast.success('Form edited successfully!', {
              position: 'top-right'
            });

            setEditMessage('Form edited successfully!');
            setTimeout(() => {
              setEditUsersForm({ id: 0, name: '', email: '', phone: '' });
              setEditMessage('');
              setEditModalShow(false);
            }, 1000);
          } else {
            setSuccess(false);
            setEditMessage('Form edit failed! Something went wrong.');
            setTimeout(() => {
              setEditMessage('');
            }, 1000);
          }
        })
        .catch((err) => console.log('submit-err', err));
    }
  };

  return (
    <Modal
      show={editModalShow}
      onHide={handleClose}
      animation={true}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>User Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="container">
          <div className="card" style={{ textAlign: 'left' }}>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>ID</label>
                    <input
                      value={editUsersForm?.id}
                      disabled
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>User Name</label>
                    <input
                      name="name"
                      id="name"
                      value={editUsersForm?.name}
                      onChange={onTextFieldChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      id="email"
                      value={editUsersForm?.email}
                      onChange={onTextFieldChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      name="phone"
                      id="phone"
                      value={editUsersForm?.phone}
                      onChange={onTextFieldChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {editMessage && (
          <h3
            className="pt-2"
            style={{
              color: success ? 'green' : 'red',
              fontSize: '18px',
            }}
          >
            {editMessage}
          </h3>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlesubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserEditPopup;
