import React, { useEffect, useState } from "react";
import axios from "../axios";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Loading from "./Loading";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  return (
    <>
      <p className="tablet:hidden small-phone:block h-screen">
        Vui lòng sử dụng thiết bị lớn hơn để quản lý
      </p>
      <div className="tablet:block small-phone:hidden">
        {loading ? (
          <Loading />
        ) : (
          <>
            {users?.length === 0 ? (
              <h2 className="py-2 text-center">Chưa có tài khoản nào</h2>
            ) : (
              <div className="overflow-y-auto h-screen">
                <table className="w-full my-4 table-fixed tablet:text-xs big-tablet:text-sm laptop:text-base">
                  <thead>
                    <tr>
                      <th>Client Id</th>
                      <th>Client Name</th>
                      <th>Email</th>
                      <th>Các đơn hàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page === 1 ? (
                      <>
                        {users.slice(0, 8).map((user) => (
                          <tr>
                            <td className="truncate">{user._id}</td>
                            <td className="truncate">{user.name}</td>
                            <td className="truncate">{user.email}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <>
                        {users.slice(8 * (page - 1), 8 * page).map((user) => (
                          <tr>
                            <td className="truncate">{user._id}</td>
                            <td className="truncate">{user.name}</td>
                            <td className="truncate">{user.email}</td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <Stack spacing={2} className="p-1 rounded-lg">
              <Pagination
                count={Math.round(users.length / 8)}
                color="primary"
                onChange={(e, value) => setPage(value)}
              />
            </Stack>
          </>
        )}
      </div>
    </>
  );
}

export default UserList;
