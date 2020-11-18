import React from 'react';
import Link from 'next/link'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>ESS Requests</title>
      </Head>
      <nav className="navbar navbar-expand-sm navbar-light border-bottom" style={{ background: 'white' }}>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link href="/">
              <a className="nav-link">Home <span className="sr-only">(current)</span></a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/training">
              <a className="nav-link">Training</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/exam">
              <a className="nav-link">Exam</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <div className="jumbotron mt-4" style={{background: '#e1f2fb'}}>
          <h1 className="display-5 text-center">ESS Training/Exam Requests</h1>
          <p className="lead mt-4">Which request form do you need?</p>
          <hr className="mb-4" />
          <div className="container-fluid content-row">
            <div className="row">
              <div className="col-sm-6  my-2">
                <Link href="/training">
                  <div className="card h-100 hoverForm" style={{ cursor: 'pointer' }}>
                    <div className="card-body">
                      <h5 className="card-title">Request for Training</h5>
                      <p className="card-text">When requesting instructor led or course training that requires management approval.</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-sm-6 my-2">
                <Link href="/exam">
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
    </div>
  )
}
