"use client"

import {OrganizationSwitcher, useOrganization, UserButton} from "@clerk/nextjs";
import {SearchInput} from "@/app/(dashboard)/_components/search-input";
import {InviteButton} from "@/app/(dashboard)/_components/invite-button";

const Navbar = () => {
    const {organization} = useOrganization()
    return (
        <div className={"flex items-center gap-x-4 p-5"}>
            <div className={"hidden lg:flex-1 lg:flex"}>
                <SearchInput/>
            </div>
            <div className={"block lg:hidden flex-1"}>
                <OrganizationSwitcher hidePersonal appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%"
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            justifyContent: "space-between",
                            backgroundColor: "white"
                        }
                    }
                }}/>
            </div>
            {
                organization && <InviteButton/>
            }
            <UserButton/>
        </div>
    );
};

export default Navbar;