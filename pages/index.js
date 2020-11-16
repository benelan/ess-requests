import React from 'react';
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
  return (
    <div>
      <title>Training Request</title>
      <h2 className="text-center m-4">ESS Training Request</h2>

      <div className="container">
        Which request form do you want?
          <ul>
          <li>
            <Link href="/form/instructor">
              <a>Instructor Lead Course</a>
            </Link>
          </li>
          <li>
            <Link href="/form/certificate">
              <a>Certification Exam</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
