/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

/**
 * The top navbar
 * @class
 * @name TopNav
 * @param {string} page - which page is currently active
 */
export default function TopNav({ page }) {
  return (
    <nav
      className="navbar navbar-expand navbar-light border-bottom"
      style={{ background: 'white' }}
    >
      <ul className="navbar-nav">
        <li className={page === 'home' ? 'nav-item active' : 'nav-item'}>
          <Link href={`${publicRuntimeConfig.basePath}/`}>
            <a className="nav-link">Home</a>
          </Link>
        </li>
        <li className={page === 'training' ? 'nav-item active' : 'nav-item'}>
          <Link href={`${publicRuntimeConfig.basePath}/training`}>
            <a className="nav-link">Training</a>
          </Link>
        </li>
        <li className={page === 'exam' ? 'nav-item active' : 'nav-item'}>
          <Link href={`${publicRuntimeConfig.basePath}/exam`}>
            <a className="nav-link">
              Exam
              <span className="sr-only">(current)</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

TopNav.propTypes = {
  /** the type of form */
  page: PropTypes.oneOf(['home', 'training', 'exam']).isRequired,
}