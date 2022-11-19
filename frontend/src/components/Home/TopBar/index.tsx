import Image from 'next/image';
import * as S from './TopBar.styled';
import React, { useEffect, useState } from 'react';
import { UserAvatar, UserName } from '../../../utils/dataConfig';
import Logo from '../../../assets/imgs/LogoFullLong.png';
import UserInfo from './UserInfo';
import NotiModal from './NotiModal';
import { useGlobalContext } from '../../../contexts/globalContext';
import SettingsModal from './SettingsModal';
import { UsersApi } from '../../../services/api/users';
import SearchModal from './SearchModal';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserState,
  userActions,
} from '../../../features/redux/slices/userSlice';
import { useRouter } from 'next/router';
import { SearchResult } from '../../../utils/types';

const TopBar = () => {
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [activeNotiModal, setActiveNotiModal] = useState(false);
  const [settingVisible, setSettingVisible] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchModal, setSearchModal] = useState(false);
  const [action, setAction] = useState(false);

  const loggedUser = useSelector(selectUserState);
  const dispatch = useDispatch();
  const router = useRouter();

  const getLoggedUser = async () => {
    dispatch(userActions.requestUserInfo(null));
    const result = await UsersApi.getLoggedUser();
    dispatch(userActions.setUserInfo(result));
  };

  const logout = async () => {
    dispatch(userActions.clearUserInfo(null));
    await UsersApi.logout();
    router.push('/login');
  };

  const getSearchResult = async () => {
    if (searchInput) {
      try {
        const res = await UsersApi.userFind({ search: searchInput });
        setSearchResult(res.result);
        setSearchModal(true);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSearchResult([]);
      setSearchModal(false);
    }
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  useEffect(() => {
    let t: any;
    if (!action) {
      t = setTimeout(() => {
        getSearchResult();
      }, 1000);
    } else {
      getSearchResult();
    }
    return () => clearTimeout(t);
  }, [searchInput, action]);

  return (
    <S.Container>
      <S.Wrapper>
        <S.LeftWrapper onClick={() => setUserInfoModal(true)}>
          <S.Avatar>
            {loggedUser.info.avatar !== '' && (
              <Image
                src={loggedUser.info.avatar}
                alt='avatar'
                layout='fill'
                objectFit='contain'
              />
            )}
          </S.Avatar>
          <S.UserName>{loggedUser.info.name}</S.UserName>
        </S.LeftWrapper>
        <S.RightWrapper>
          <S.LogoContainer>
            <S.Logo>
              <Image src={Logo} alt='logo' />
            </S.Logo>
          </S.LogoContainer>
          <S.Search>
            <S.SearchIcon />
            <S.SearchInput
              placeholder='Search...'
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            {searchInput && (
              <SearchModal
                setSearchModal={setSearchModal}
                searchResult={searchResult}
                setAction={setAction}
              />
            )}
          </S.Search>
          <S.Option>
            <S.OptionNotify onClick={() => setActiveNotiModal(true)} />
            {activeNotiModal && (
              <NotiModal setActiveNotiModal={setActiveNotiModal} />
            )}
            <S.OptionSetting onClick={() => setSettingVisible(true)} />
            {settingVisible && (
              <SettingsModal
                setSettingVisible={() => setSettingVisible(false)}
              />
            )}
            <S.OptionLogOut onClick={() => logout()} />
          </S.Option>
        </S.RightWrapper>
        {userInfoModal && (
          <UserInfo
            phoneNumber={loggedUser.info.phone}
            name={loggedUser.info.name}
            gender={loggedUser.info.gender}
            dob={loggedUser.info.dob}
            avatar={loggedUser.info.avatar}
            banner={loggedUser.info.banner}
            setUserInfoModal={setUserInfoModal}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
};

export default TopBar;
