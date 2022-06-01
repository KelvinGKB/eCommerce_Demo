import { Affix, Avatar, Badge, Row } from "antd";
import { NavigationBarProps } from "../../types/dataTypes";
import "../NavigationBar/style.css";
import profileImage from "../../assests/profile-pic.png";

const NavigationBar = (props : NavigationBarProps ) =>{

    return (
        <Affix offsetTop={0} className="w-full">
            <div className="navigation-bar">
                <div className="logo">
                    <span>LOGO</span>
                </div>
                <div className="navigation-link">
                    <a className="link-item" href="#">EVENTS</a>
                    <a className="link-item" href="#">FEATURES</a>
                    <a className="link-item" href="#">COMMUNITY</a>
                    <a className="link-item" href="#">CATALOGUE</a>
                </div>
                <div className="profile-item">
                    <Badge dot offset={[-20,15]}>
                        <Avatar src={profileImage} size={64} shape="square" />
                    </Badge>
                </div>
            </div>
        </Affix>
    );
}

export default NavigationBar;