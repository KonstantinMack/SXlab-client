import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./LoadingScreen.scss";

export default function LoadingScreenWide({ count }) {
  return (
    <div className="loading">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
          <Skeleton count={count} height="3rem" />
        </p>
      </SkeletonTheme>
    </div>
  );
}
