import userRepository from '@/modules/user/user.repository';

const checkUserExists = async (emailOrAlias: string): Promise<boolean> => {
  const userAliasFound = await userRepository.getUserByAlias(emailOrAlias);

  if (userAliasFound) {
    return true;
  }

  const userEmailFound = await userRepository.getUserByEmail(emailOrAlias);
  return !!userEmailFound;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  checkUserExists
};
