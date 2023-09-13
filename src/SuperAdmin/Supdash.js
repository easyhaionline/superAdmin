import React from 'react';
import '../SuperAdmin/superAdmin.scss';
import {
  BsFillBarChartFill,
  BsFillGridFill,
  BsFillPersonLinesFill,
  BsFilterLeft,
} from 'react-icons/bs';

function Supdash() {
  return (
    <>
      <div className="superadmin_dash">
        <div className="header">
          <h4>
            SuperAdmin Dashboard <BsFilterLeft />
          </h4>
        </div>
        <div className="container content mt-4">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="card card1">
                  <div class="card-body">
                    <h5>
                      {' '}
                      <BsFillBarChartFill className="dashicon" /> Daily Doubts
                      Limits{' '}
                    </h5>
                    <h4 style={{ textAlign: 'center' }}>50</h4>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card card2">
                  <div class="card-body">
                    <h5>
                      {' '}
                      <BsFillGridFill className="dashicon" />
                      Doubts Plan
                    </h5>
                    <h4 style={{ textAlign: 'center' }}>20</h4>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card card3">
                  <div class="card-body">
                    <h5>
                      <BsFillPersonLinesFill className="dashicon" /> LoggedIn
                      Students
                    </h5>
                    <h4 style={{ textAlign: 'center' }}>5890</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="chart mt-3">
          <p className="graphpara">
            Diagram Representaion of last one month LoggedIn Student{' '}
          </p>
          <img
            src="https://aglowiditsolutions.com/wp-content/uploads/2022/02/React-Chart-js-2.png"
            style={{ width: '100%' }}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Supdash;
