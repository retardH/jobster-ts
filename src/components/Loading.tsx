import { SyncLoader } from 'react-spinners';

type LoadingProps = {
  isLoading: boolean;
  color?: string;
  isFixed?: boolean;
};
const Loading = ({ isLoading, color, isFixed = true }: LoadingProps) => {
  return (
    <>
      <SyncLoader
        color={color}
        loading={isLoading}
        style={{
          position: isFixed ? 'fixed' : 'absolute',
          top: '50%',
          left: isFixed ? '55%' : '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default Loading;
