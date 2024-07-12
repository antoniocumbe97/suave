import React, { Fragment } from "react";
import { Nav, NavItem, NavLink, TabContent  } from "reactstrap";

const NavTabs = ({tabs,tab,setTab}) => {
    return (
        <Fragment>
            <Nav className="border-bottom" tabs>
                {tabs.map((el, index) => (
                    <NavItem
                        key={el.id}
                    >
                        <NavLink
                            className={tab === index ? "active fw-semibold" : "fw-semibold"}
                            style={{
                                marginBottom: "0px",
                                color: tab === index && "var(--insignio-secondary)",
                                borderBottom: tab === index ? "3px solid var(--insignio-secondary)" : "",
                                backgroundColor: "transparent"
                            }}
                            href="#"
                            onClick={() => setTab(index)}
                        >
                            {el.title}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
            <TabContent className="px-0" activeTab={tab}>
                {tabs[tab].content}
            </TabContent>
        </Fragment>
    );
}

export const NavTabsDetails = ({tabs,tab,setTab}) => {
    return (
        <Fragment>
            <Nav className="border" tabs>
                {tabs.map((el, index) => (
                    <NavItem
                        key={el.id}
                    >
                        <NavLink
                            className={tab === index ? "active fw-semibold" : "fw-semibold"}
                            style={{
                                marginBottom: "0px",
                                color: tab === index ? "var(--insignio-secondary)":"var(--insignio-gray)",
                                borderBottom: tab === index ? "3px solid var(--insignio-secondary)" : "",
                                backgroundColor: "transparent"
                            }}
                            href="#"
                            onClick={() => setTab(index)}
                        >
                            {el.title}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
            <TabContent className="px-0" activeTab={tab}>
                {tabs[tab].content}
            </TabContent>
        </Fragment>
    );
}

export default NavTabs;