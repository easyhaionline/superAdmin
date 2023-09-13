import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ServerURI, getAuth } from '../commonUri';

function Dailydoubts() {
  const [data, setData] = useState({ dailyDoubtLimit: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [dailyDoubtLimit, setdailyDoubtLimit] = useState(data.dailyDoubtLimit);
  console.log(dailyDoubtLimit);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSaveClick = async () => {
    try {
      const response = await axios.post(
        `${ServerURI}/api/v1/modules/superadmin/dailydoubtlimit`,
        { dailyDoubtLimit },
        {
          headers: {
            'eh-auth-token': getAuth(),
          },
        }
      );
      toast.success("Your Available doubt");
      setData({ dailyDoubtLimit });
      setIsEditing(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${ServerURI}/api/v1/modules/superadmin/dailydoubtlimit`,
        {},
        {
          headers: {
            'eh-auth-token': getAuth(),
          },
        }
      );
      const updatedDocument = response.data.data.updatedDocument;
      setData({ dailyDoubtLimit: updatedDocument.dailyDoubtLimit }); // Update data with the fetched dailyDoubtLimit
      toast.success("Your Available doubt");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="login_leads_data">
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <h2>Daily Doubt Limit</h2>
            </div>
            <div className="col">
              {isEditing ? (
                <input
                  type="number"
                  value={dailyDoubtLimit}
                  onChange={(e) => setdailyDoubtLimit(e.target.value)}
                />
              ) : (
                <h1>{data.dailyDoubtLimit}</h1>
              )}
            </div>
            <div className="col">
              {isEditing ? (
                <button
                  className="btn"
                  style={{ backgroundColor: 'green' }}
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn"
                  style={{ backgroundColor: 'orange' }}
                  onClick={handleEditClick}
                >
                  Edit Limit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dailydoubts;
