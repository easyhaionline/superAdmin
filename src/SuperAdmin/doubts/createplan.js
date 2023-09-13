import React from 'react';
import '../superAdmin.scss';
import axios, { Axios } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ServerURI, getAuth } from '../commonUri';
function Createplan() {
  const [planName, setplanName] = useState('');
  const [planPrice, setplanPrice] = useState('');
  const [askDoubtPurchasedNumber, setaskDoubtPurchasedNumber] = useState('');
  const [askDoubtPurchasedValidity, setaskDoubtPurchasedValidity] =
    useState('');
  // useEffect(() => {
  //   onSubmitHandler();
  // }, []);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let newObject = {
      planName,
      planPrice,
      askDoubtPurchasedNumber,
      askDoubtPurchasedValidity,
    };
    // console.log("l-19", newObject);
    try {
      await axios.post(
        `${ServerURI}/api/v1/modules/doubt/createplan`,
        newObject,
        {
          headers: {
            'eh-auth-token': getAuth(),
          },
        }
      );

      toast.success('created successfull');
    } catch (error) {
      toast.error('Plan Creation failed');
    }
  };
  return (
    <>
      <div className="createplan_mains ">
        <div
          className="container mt-5 w-75 p-5"
          style={{ backgroundColor: 'rgb(10, 64, 92)', borderRadius: '10px' }}
        >
          <div className="header">
            <h3>Create Plan!!</h3>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Plan-name
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  onChange={(val) => {
                    setplanName(val.target.value);
                  }}
                  class="form-control"
                  id="inputPassword"
                />
              </div>
            </div>

            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Plan-price{' '}
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(val) => {
                    setplanPrice(val.target.value);
                  }}
                  type="number"
                  class="form-control"
                  id="inputPassword"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Number
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(val) => {
                    setaskDoubtPurchasedNumber(val.target.value);
                  }}
                  type="number"
                  class="form-control"
                  id="inputPassword"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Validity
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(val) => {
                    setaskDoubtPurchasedValidity(val.target.value);
                  }}
                  type="number"
                  class="form-control"
                  id="inputPassword"
                />
              </div>
            </div>
            <div className="" style={{ textAlign: 'end' }}>
              <button
                className="btn"
                type="submit"
                style={{ backgroundColor: 'white' }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Createplan;
