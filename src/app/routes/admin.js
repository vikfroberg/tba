import React from 'react'
import AdminIndex from '../views/admin/index'

const index = ['GET', '/admin', ({ render }) => {
    render(<AdminIndex />)
}]

export default [index]
