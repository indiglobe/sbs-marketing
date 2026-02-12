"use client";

import { HelpLineDialog } from "./helpline-dialog";
import { ReferDialog } from "./refer-dialog";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./shadcn/navigation-menu";
import { Link, useLoaderData } from "@tanstack/react-router";

export function NavigationItemsList() {
  const { role } = useLoaderData({ from: "/(auth)" });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/dashboard">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {role === "admin" && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/manage">Manage</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/kyc">KYC</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <ReferDialog />
        </NavigationMenuItem>

        <NavigationMenuItem>
          <HelpLineDialog />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
