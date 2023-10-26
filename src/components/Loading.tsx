import { SyncLoader } from "react-spinners";

type LoadingProps = {
  isLoading: boolean;
  color?: string;
};
const Loading = ({ isLoading, color }: LoadingProps) => {
  return (
    <>
      <SyncLoader
        color={color}
        loading={isLoading}
        style={{
          position: "fixed",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default Loading;