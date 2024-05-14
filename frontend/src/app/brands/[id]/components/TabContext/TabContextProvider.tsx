"use client";

import React, {useState} from 'react';
import TabContext, {Tabs} from "@/app/brands/[id]/components/TabContext/TabContext";

export default function TabContextProvider({ children }: {
    children?: React.ReactNode;
}) {
    const [tab, setTab] = useState<Tabs>(Tabs.Information);

    return (
        <TabContext.Provider
            value={{ tab, setTab }}
        >
            {children}
        </TabContext.Provider>
    );
}
