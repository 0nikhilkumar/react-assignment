import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UserForm {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserCreateModalProps {
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  userDatas: UserForm[];
  setUserDatas: React.Dispatch<React.SetStateAction<UserForm[]>>;
}

const UserCreateModal: React.FC<UserCreateModalProps> = ({
  modalShow,
  setModalShow,
  userDatas,
  setUserDatas,
}) => {
  const [addMessage, setAddMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [validation, setValidation] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<UserForm>({
    id: uuidv4(),
    name: '',
    email: '',
    phone: '',
  });

  const handleClose = () => setModalShow(false);

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitClick = () => {
    if (!userForm.name || !userForm.email || !userForm.phone) {
      setSuccess(false);
      setAddMessage('Please fill all the fields!');
      setTimeout(() => {
        setAddMessage('');
      }, 1500);
    } else {
      const formData: UserForm = {
        id: userForm.id,
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone,
      };

      axios
        .post(`https://jsonplaceholder.typicode.com/users`, formData)
        .then((data) => {
          if (data.status === 201) {
            setSuccess(true);
            setAddMessage('Form submitted successfully!');
            toast.success('Form submitted successfully!', {
              position: 'top-right',
            });

            setUserDatas([...userDatas, data.data]);

            setTimeout(() => {
              setUserForm({
                id: uuidv4(),
                name: '',
                email: '',
                phone: '',
              });
              setAddMessage('');
              handleClose();
            }, 1000);
          } else {
            setSuccess(false);
            setTimeout(() => {
              setAddMessage('');
            }, 1500);
          }
        })
        .catch((err) => {
          console.log('submit-err', err);
        });
    }
  };

  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      animation={true}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>User Create</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card-body">
          <div className="row">
            <div className="col col-lg-12 col-md-12 col-sm-12">
              <div className="col-lg-12 mb-2">
                <div className="form-group">
                  <label style={{ float: 'left', marginBottom: '4px' }}>
                    User Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={userForm.name}
                    onMouseDown={() => setValidation(true)}
                    onChange={onFieldChange}
                    className="form-control"
                    placeholder="Type name here"
                  />
                  {userForm.name.length === 0 && validation && (
                    <div style={{ textAlign: 'left' }}>
                      <span className="text-danger">Enter employee name</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-12 mb-2">
                <div className="form-group">
                  <label style={{ float: 'left', marginBottom: '4px' }}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    required
                    value={userForm.email}
                    onChange={onFieldChange}
                    onMouseDown={() => setValidation(true)}
                    className="form-control"
                    placeholder="Type email here"
                  />
                  {userForm.email.length === 0 && validation && (
                    <div style={{ textAlign: 'left' }}>
                      <span className="text-danger">Enter email</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-12 mb-2">
                <div className="form-group">
                  <label style={{ float: 'left', marginBottom: '4px' }}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    value={userForm.phone}
                    onChange={onFieldChange}
                    onMouseDown={() => setValidation(true)}
                    className="form-control"
                    placeholder="Type phone here"
                  />
                  {userForm.phone.length === 0 && validation && (
                    <div style={{ textAlign: 'left' }}>
                      <span className="text-danger">Enter phone number</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {addMessage && (
          <h3
            className="pt-2"
            style={{
              color: success ? 'green' : 'red',
              fontSize: '18px',
            }}
          >
            {addMessage}
          </h3>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitClick}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserCreateModal;
