import {useCallback} from 'react';
import {IBasePaginateData} from '@models/pagination/pagination.type';
import {IUser} from '@models/users/user.type';
import useUserViewModel from '@redux/hooks/useUserViewModel';

const useUserList = () => {
  const {
    computedLoading,
    computedIsEnd,
    userPaginateData,

    handleGetUserPaginate,
  } = useUserViewModel();

  const handleRefresh = useCallback(() => {
    if (computedLoading) {
      return;
    }
    handleGetUserPaginate({page: 1});
  }, [computedLoading]);

  const handleNextPage = useCallback(() => {
    if (computedLoading || userPaginateData?.meta.total == 0) {
      return;
    }
    handleGetUserPaginate({page: userPaginateData?.meta?.current_page + 1});
  }, [computedLoading, userPaginateData?.meta?.current_page]);

  return {
    computedLoading,
    computedIsEnd,
    userPaginateData: userPaginateData as IBasePaginateData<IUser>,

    handleRefresh,
    handleNextPage,
  };
};

export default useUserList;
