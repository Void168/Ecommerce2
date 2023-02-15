import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import OrderList from "../components/OrderList";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserList from "../components/UserList";
import Loading from "../components/Loading";
import ArticleList from "../components/ArticleList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Dashboard() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
        className="small-phone:h-screen big-phone:h-full  bg-[#51C4D3] shadow-sm container mx-auto big-tablet:block small-phone:hidden small-phone:mb-16 "
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Dashboard Tabs"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Sản phẩm" {...a11yProps(0)} />
          <Tab label="Đơn hàng" {...a11yProps(1)} />
          <Tab label="Khách hàng" {...a11yProps(2)} />
          <Tab label="Bài viết" {...a11yProps(3)} />
        </Tabs>
        {loading ? (
          <div className="relative h-screen flex justify-center items-center text-center w-full">
            <Loading />
          </div>
        ) : (
          <>
            <TabPanel value={value} index={0}>
              <ProductList />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OrderList />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <UserList />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <ArticleList />
            </TabPanel>
          </>
        )}
      </Box>
    </>
  );
}

export default Dashboard;
