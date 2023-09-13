import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ServerURI, getAuth } from '../commonUri';
import { BsArrowLeftCircleFill,BsArrowRightCircleFill } from "react-icons/bs";


function StudentList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const rowPerPage = 10;
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${ServerURI}/api/v1/modules/superadmin/listStudents?pageNumber=${
          page + 1
        }`,
        {
          headers: {
            'eh-auth-token': getAuth(),
          },
        }
      );
      toast.success('successfully get the data');
      setData(data);
    } catch (error) {
      toast.error('error');
    }
  };

  const onLeftClickPage = () => {
    const maxPage = Math.ceil(data?.totalDocuments / rowPerPage) - 1;
    setPage((page - 1 + maxPage + 1) % (maxPage + 1));
  };
  const onRightClickPage = () => {
    const maxPage = Math.ceil(data?.totalDocuments / rowPerPage) - 1;
    setPage((page + 1) % (maxPage + 1));
  };
  const downloadXLXS = async (orderNumber) => {
    try {
      const response = await fetch(
        `${ServerURI}/api/v1/modules/superadmin/downloadStudent`,
        {
          method: 'GET',
          headers: {
            'eh-auth-token': getAuth(),
            'Accept':
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Set the accept header for Excel
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download Excel file');
      }

      // Create a blob from the response data
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${new Date().getTime()}.xlsx`); // Set the desired file name

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up by revoking the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading Excel file:', error);
      toast.error('Error downloading Excel file');
    }
  };
  return (
    <>
      <div className="login_leads_data">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
          }}
        >
          <h4>Content</h4>
          <button onClick={downloadXLXS}>Download XLXS</button>
        </div>
        <div className="content">
          <div>
            <br />
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.studentList?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name.firstName}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneno}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  justifyContent: 'flex-end',
                  padding: '20px 20px',
                }}
              >
                <button onClick={onLeftClickPage}><BsArrowLeftCircleFill/></button>
                <h4>
                  {page + 1}/
                  {Math.ceil((data?.totalDocuments + 1) / rowPerPage)}
                </h4>
                <button onClick={onRightClickPage}><BsArrowRightCircleFill/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentList;
