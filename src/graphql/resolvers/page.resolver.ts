export default {
  Pageable: {
    __resolveType(obj: any) {
      if (obj['userId']) {
        return 'User';
      }

      return null;
    }
  }
};
