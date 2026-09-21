"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#ebe5d8" highlightColor="#f8f5ee">
      <main className="loading-shell" aria-label="页面加载中">
        <Skeleton width={150} height={24} />
        <Skeleton width="82%" height={78} />
        <Skeleton width="60%" height={26} />
        <div className="loading-grid">
          <Skeleton height={180} />
          <Skeleton height={180} />
          <Skeleton height={180} />
        </div>
      </main>
    </SkeletonTheme>
  );
}
