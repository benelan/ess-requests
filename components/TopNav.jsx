import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

/**
 * The top navbar with links to the pages
 * @class
 * @name TopNav
 * @param {string} page - active page for link
 */
/* eslint-disable jsx-a11y/anchor-is-valid */
const TopNav = ({ page }) => (
  <nav
    className="navbar navbar-expand navbar-light border-bottom"
    style={{ background: 'white' }}
  >
    <ul className="navbar-nav">
      <li className={page === 'home' ? 'nav-item active' : 'nav-item'}>
        <Link href={`${process.env.basePath}/`}>
          <a className="nav-link">Home</a>
        </Link>
      </li>
      <li className={page === 'training' ? 'nav-item active' : 'nav-item'}>
        <Link href={`${process.env.basePath}/training`}>
          <a className="nav-link">Training</a>
        </Link>
      </li>
      <li className={page === 'exam' ? 'nav-item active' : 'nav-item'}>
        <Link href={`${process.env.basePath}/exam`}>
          <a className="nav-link">Exam</a>
        </Link>
      </li>
    </ul>
  </nav>
)

TopNav.propTypes = {
  /** the type of form */
  page: PropTypes.oneOf(['home', 'training', 'exam']).isRequired,
}

export default TopNav
