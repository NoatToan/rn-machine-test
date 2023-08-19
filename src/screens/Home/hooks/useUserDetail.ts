import useUserViewModel from '@redux/hooks/useUserViewModel';

const useUserDetail = () => {
  const {
    computedLoading,

    userDetail,
    handleGetUserDetail,

    handleUpdateUser,
    handleDeleteUser,
    handleCreateUser,
  } = useUserViewModel();

  return {
    computedLoading,

    userDetail,
    handleGetUserDetail,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateUser,
  };
};

export default useUserDetail;
