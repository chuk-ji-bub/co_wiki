<<<<<<< Updated upstream
// 메인페이지 왼쪽 선택할거
=======
<<<<<<< HEAD
// 메인페이지 왼쪽 선택할거

import React from 'react';


// 메뉴 항목을 위한 타입 정의
type MenuItem = {
  name: string;
  link: string;
  subItems?: MenuItem[]; // 선택적으로 하위 메뉴 항목을 포함할 수 있음
};

// Props를 위한 타입 정의
type AsideContentProps = {
  title: string;
  menuItems: MenuItem[];
};

// 사이드바 컴포넌트
const AsideContent: React.FC<AsideContentProps> = ({ title, menuItems }) => {
  // 하위 메뉴 토글을 위한 상태 (실제 구현에는 상태 관리가 필요할 수 있음)
  // const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // 메뉴 아이템을 렌더링하는 함수
  const renderMenuItem = (item: MenuItem) => (
    <li key={item.name}>
      <a href={item.link}>{item.name}</a>
      {item.subItems && (
        <ul>
          {item.subItems.map(subItem => renderMenuItem(subItem))}
        </ul>
      )}
    </li>
  );

  return (
    <aside>
      <h2>{title}</h2>
      <ul>
        {menuItems.map(item => renderMenuItem(item))}
      </ul>
    </aside>
  );
};

export default AsideContent;
=======
// 메인페이지 왼쪽 선택할거
>>>>>>> 1314cef95ef5391b08309ecdd5132f18a0c3017f
>>>>>>> Stashed changes
