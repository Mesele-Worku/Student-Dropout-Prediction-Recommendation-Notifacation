import React, { useContext } from "react";
import EvangadiLogo from "../../assets/black-logo.png";
import styles from "./header.module.css";
import { Avatar, Dropdown, Menu } from "antd"; // Using Ant Design components (install if needed)
// Or use a simple image as avatar
import UserAvatar from "../../assets/user-avatar.jpg";
import { AppContext } from "../../Context/AppContext";

const Header = () => {
  const { user } = useContext(AppContext);
  const userData = {
    name: user.name,
    email: user.email,
    role: "AWS Student",
    avatar: UserAvatar,
  };

  const menu = (
    <Menu className="">
      <Menu.Item key="1">
        <div className="px-4 py-2">
          <p className="font-semibold">{userData.name}</p>
          <p className="text-gray-500 text-sm">{userData.email}</p>
          <p className="text-xs text-blue-500">{userData.role}</p>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">My Profile</Menu.Item>
      <Menu.Item key="3">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className={`${styles.header} sticky top-0`}>
      <div className={styles.header_container}>
        <div
          className={`styles.header_logo flex justify-center items-end text-[#FF8500] gap-2`}
        >
          <a href="/">
            <img src={EvangadiLogo} alt="img" width={220} />
          </a>
          <p>Analytics</p>
        </div>
        <div className={styles.header_right}>
          <nav className="right">
            <ul className="flex items-center gap-6">
              <li className={`styles.home hidden md:block`}>
                <a href="/">Home</a>
              </li>
              <li className={`styles.work hidden md:block`}>
                <a href="/">How it Works</a>
              </li>
              {/* <button className="border-none bg-[#0079fa] text-white py-3 px-[30px] text-center text-xs cursor-pointer rounded-md font-bold transition-all duration-300 ease-in-out hidden sm:block">
                JOIN THE COMMUNITY
              </button> */}

              {/* User Profile Dropdown */}
              <li className="!ml-8">
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  overlayClassName="text-base"
                >
                  <div className="flex items-center cursor-pointer gap-2">
                    <span className="hidden md:inline font-medium">
                      {userData.name}
                    </span>
                    <Avatar
                      src={userData.avatar}
                      size="large"
                      // className="!border !border-gray-300"
                    />
                  </div>
                </Dropdown>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
