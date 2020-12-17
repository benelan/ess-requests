import React from 'react'
import Link from 'next/link'
import getConfig from 'next/config'
import TopNav from '../components/TopNav'

const { publicRuntimeConfig } = getConfig()

/**
 * Home page for selecting a form
 * @author Ben Elan
 * @name Home
 * @class
 */
export default function Home() {
  return (
    <div>
      <title>ESS Requests</title>
      <TopNav page="home" />
      <div className="container">
        <div className="jumbotron mt-4" style={{ background: '#e1f2fb' }}>
          <h1 className="display-5 text-center">ESS Requests</h1>
          <p className="lead mt-4">Which request form do you need?</p>
          <hr className="mb-4" />
          <div className="container-fluid content-row">
            <div className="row">
              <div className="col-sm-6  my-2">
                <Link href={`${publicRuntimeConfig.basePath}/training`}>
                  <div
                    className="card h-100 shadow hoverForm"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Request for Training</h5>
                      <p className="card-text">
                        When requesting instructor led or course training that
                        requires management approval.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-sm-6 my-2">
                <Link href={`${publicRuntimeConfig.basePath}/exam`}>
                  <div
                    className="card h-100 shadow hoverForm"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        Request for Exam Certification
                      </h5>
                      <p className="card-text">
                        Formal request for taking a certification exam.
                      </p>
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
