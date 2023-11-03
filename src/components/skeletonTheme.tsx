"use client"
import { useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { useMyTheme } from "@contexts/themeHandler"

export function Skeletons({ children }) {
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useMyTheme()
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null
    const skeletonColor = theme === "dark" ? "rgba(211, 211, 211,0.1)" : "red"
    return <SkeletonTheme baseColor="transparent" highlightColor={skeletonColor}>{children}</SkeletonTheme>
}