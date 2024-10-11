import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const UserDetail: React.FC = () => {
  const { state } = useLocation();
  const { uId } = useParams<{ uId: string }>(); // Typed useParams for the expected URL param
  const [singleUserData, setSingleUserData] = useState<UserData | null>(null); // Set type to UserData or null
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserDetail = () => {
    setIsLoading(true);
    axios
      .get<UserData>(`https://jsonplaceholder.typicode.com/users/${uId}`)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setSingleUserData(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserDetail();
  }, [state?.singleUser, uId]);

  return (
    <div>
      <div className="container">
        <div className="card row py-4" style={{ textAlign: 'left' }}>
          <div className="card-title">
            <h2>
              <u>User Detail</u>
            </h2>
          </div>
          <div className="card-body"></div>

          {isLoading ? (
            <div className="container">
              <Loader />
            </div>
          ) : (
            singleUserData && (
              <div>
                <h2>
                  The User name is : <b>{singleUserData.name}</b>
                </h2>
                <h6>
                  <b>User Id:</b> {singleUserData.id}
                </h6>
                <h3>Contact Details</h3>
                <h5>Email is : {singleUserData.email}</h5>
                <h5>Phone is : {singleUserData.phone}</h5>
                <Link className="btn btn-secondary" to="/userlist">
                  Back to List
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
