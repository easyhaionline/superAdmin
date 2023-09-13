import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BsPencilFill } from 'react-icons/bs';
import { ServerURI, getAuth } from '../commonUri';
function Availableplan() {
  const [data, setData] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedData(data[index]);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `${ServerURI}/api/v1/modules/doubt/updateplan`,
        editedData,
        {
          headers: {
            'eh-auth-token': getAuth(),
          },
        }
      );

      toast.success('Plan Upate Successfull!!');
    } catch (error) {
      console.error('Error:', error);
    }
    const updatedData = [...data];
    updatedData[editIndex] = editedData;

    setEditIndex(-1);

    setData(updatedData);
  };
  // console.log("l-6", data);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${ServerURI}/api/v1/modules/doubt/availableplan`,
        {
          headers: {
            'eh-auth-token': getAuth(),
          },
        }
      );
      // console.log("l-53", response.data.data);
      // toast.success("Your Avilable Plan");
      setData(response.data.data.availablePlan);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${ServerURI}/api/v1/modules/doubt/plan`, {
        headers: {
          'eh-auth-token': getAuth(),
        },
        data: { _id },
      });
      const updatedData = data.filter((item) => item._id !== _id);
      setData(updatedData);
      toast.success('Deleted successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className="login_leads_data">
        <div className="content">
          <div className="container">
            {Array.isArray(data) && data.length > 0 ? (
              <table className="table">
                <thead style={{ backgroundColor: 'grey' }}>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Number</th>
                    <th>Validity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editedData.planName}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                planName: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span>{item.planName}</span>
                        )}
                      </td>
                      <td>
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editedData.planPrice}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                planPrice: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span>{item.planPrice}</span>
                        )}
                      </td>
                      <td>
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editedData.askDoubtPurchasedNumber}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                askDoubtPurchasedNumber: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span>{item.askDoubtPurchasedNumber}</span>
                        )}
                      </td>
                      <td>
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editedData.askDoubtPurchasedValidity}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                askDoubtPurchasedValidity: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span>{item.askDoubtPurchasedValidity}</span>
                        )}
                      </td>

                      <td>
                        {editIndex === index ? (
                          <button
                            className="btn"
                            style={{ backgroundColor: 'red', color: 'white' }}
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEditClick(index)}
                          >
                            <BsPencilFill />
                          </button>
                        )}
                        <span> </span>{' '}
                        <button
                          className="btn btn-primary"
                          onClick={() => handleDelete(item._id)} // Pass the _id here
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No data available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Availableplan;
