import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { FaBeer, FaHeart } from 'react-icons/fa'

const ProSidebar: React.FC = () => {
    return (
        <div style={{ height: "100vh" }}>
            <Sidebar>
                <Menu>
                    <MenuItem> I75 League </MenuItem>
                    <SubMenu label="Recaps">
                        <MenuItem icon={<FaBeer/>}> 2023 </MenuItem>
                        <MenuItem icon={<FaHeart/>}> 2024 </MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
        
    )
}

export default ProSidebar