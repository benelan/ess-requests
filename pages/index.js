import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
  return (
    <div className="container">
      <div className="jumbotron mt-4">
        <title>ESS Requests</title>
        <h1 className="display-5 text-center">ESS Training/Exam Requests</h1>
        <p className="lead mt-4">Which request form do you want?</p>
        <hr className="mb-4" />
        <div class="container-fluid content-row">
          <div className="row">
            <div className="col-sm-6  my-2">
              <Link href="/training">
                <div className="card h-100 hoverForm" style={{ cursor: 'pointer' }}>
                  <div className="card-body">
                    <h5 className="card-title">Request for Training</h5>
                    <p className="card-text">When requesting Instructor led or course training that requires management approval.</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-sm-6 my-2">
              <Link href="/training">
                <div className="card h-100 hoverForm" style={{ cursor: 'pointer' }}>
                  <div className="card-body">
                    <h5 className="card-title">Request for Exam Certification</h5>
                    <p className="card-text">Formal request for taking a certification exam.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
