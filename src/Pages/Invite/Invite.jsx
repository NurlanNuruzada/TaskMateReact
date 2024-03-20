import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Style from './Invite.module.css'

export default function Invite() {
    return (
        <div className={Style.mainWrapper}>
            <Col sm={6} className='d-flex align-items-center justify-content-center flex-column'>
                <div className='d-flex justify-content-center'>
                    <h5 className='fw-bold'>Nurlan Nuruzade</h5>
                    <h5 className='fw-normal mx-2'>invited you to</h5>
                    <h5 className='fw-bold'>qweezSwe!</h5>
                </div>
                <p className='mt-3'>Looks like you need to be logged into your TaskMate account to join this workspace.</p>
                <div className='col-6 d-flex justify-content-between mt-2'>
                    <Button className='create-workspace-submit w-75 me-2'>Sign up</Button>
                    <Button  className='default-submit w-75 ms-2 fw-bold'>Log in</Button>
                </div>
                <a className='mt-4 btn-anchor' href="/">Learn more about TaskMate</a>
            </Col>
        </div>
    )
}
