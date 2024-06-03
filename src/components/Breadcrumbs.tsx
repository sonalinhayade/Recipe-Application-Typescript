import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const breadcrumbs = [{ title: 'Home', link: '/' }];

  if (pathnames.length > 0) {
    breadcrumbs.push({ title: 'Recipe List', link: '/recipes' });
  }

  if (pathnames.length > 1) {
    breadcrumbs.push({ title: 'Recipe Details', link: `/${pathnames.slice(0, 2).join('/')}` });
  }

  const handleNavigate = (link: string) => {
    if (link === '/recipes' && pathnames.length > 1) {
      navigate(-1); 
    } else {
      navigate(link); 
    }
  };

  return (
    <Breadcrumb className="custom-breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb.Item 
          key={index} 
          active={index === breadcrumbs.length - 1}
          className="custom-breadcrumb-item"
          onClick={() => handleNavigate(breadcrumb.link)}
        >
          {breadcrumb.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
