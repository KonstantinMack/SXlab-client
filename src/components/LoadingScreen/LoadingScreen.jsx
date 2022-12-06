import Card from "../Card/Card";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function LoadingScreen() {
  return (
    <div className="loading user__loading-screen">
      <Card>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p>
            <Skeleton count={7} height="3rem" />
          </p>
        </SkeletonTheme>
      </Card>
      <Card>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p>
            <Skeleton count={7} height="3rem" />
          </p>
        </SkeletonTheme>
      </Card>
      <Card>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p>
            <Skeleton count={7} height="3rem" />
          </p>
        </SkeletonTheme>
      </Card>
      <Card addClass={"user__loading-screen--long"}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p>
            <Skeleton count={7} height="3rem" />
          </p>
        </SkeletonTheme>
      </Card>
    </div>
  );
}
