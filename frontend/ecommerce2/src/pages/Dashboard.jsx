import React, { useState } from 'react'
import ProductList from '../components/ProductList'
import OrderList from '../components/OrderList'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import UserList from '../components/UserList'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

function Dashboard() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
      }}
      className="h-full bg-[#51C4D3] shadow-sm container mx-auto"
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Dashboard Tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Sản phẩm" {...a11yProps(0)} />
        <Tab label="Đơn hàng" {...a11yProps(1)} />
        <Tab label="Khách hàng" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ProductList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserList />
      </TabPanel>
    </Box>
  )
}

export default Dashboard
