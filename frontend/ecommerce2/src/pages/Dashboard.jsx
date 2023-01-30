import React from 'react'
import DashboardProducts from '../components/DashboardProducts'

function Dashboard() {
  return (
    <div className="container">
      <div>
        <div className="flex flex-row">
          <ul className="flex flex-col">
            <li>Sản phẩm</li>
            <li>Đơn hàng</li>
            <li>Khách hàng</li>
          </ul>
          <div>
            <DashboardProducts />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
