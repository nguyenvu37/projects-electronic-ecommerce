import React from 'react';
import CameraItem from './cameraItem';
import './../../../common/style.css';

const CamerasPage = () => {
    return (
        <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h2
            className='text-uppercase my-4'
            style={{
              fontWeight: '600',
              textShadow: '4px 4px 7px rgba(150, 152, 150, 1)'
            }}
          >
            cameras
          </h2>
        </div>
        <div className="col-12">
            <div className="hotdeal">
                <CameraItem />
            </div>
        </div>
      </div>
    </div>
    );
};

export default CamerasPage;