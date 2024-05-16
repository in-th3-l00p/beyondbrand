"use client";

import {panelContainer} from "@/app/brands/[id]/components/components";
import InstagramPosts from "@/app/brands/[id]/components/instagramPosts";

export default function SocialMediaTab() {
    return (
        <div className={panelContainer()}>
            <InstagramPosts />
        </div>
    );
}