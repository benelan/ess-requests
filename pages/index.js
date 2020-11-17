import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
  return (
    <div>
      <title>ESS Requests</title>
      <h2 className="text-center m-4">ESS Training/Exam Requests</h2>

      <div className="container">
        Which request form do you want?
          <ul>
          <li>
            <Link href="/training">
              <a>Instructor Lead Course</a>
            </Link>
          </li>
          <li>
            <Link href="/exam">
              <a>Certification Exam</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
