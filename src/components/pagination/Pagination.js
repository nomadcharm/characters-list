import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useData } from '../providers';
import { useCharacterFilters } from '../providers/FilterProvider';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();
  const { filteredCharacters, filteredPages } = useCharacterFilters();

  const isFiltered = filteredCharacters.length > 0;

  useEffect(() => {
    let totalPages = isFiltered ? filteredPages.pages || 0 : info.pages;

    const createdPages = Array.from({ length: totalPages }, (_, i) => {
      const URLWithPage = new URL(apiURL);
      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage.toString();
    });

    setPages(createdPages);
  }, [apiURL, filteredPages, info, isFiltered]);

  const handleFirstPageClick = () => {
    navigateToPage(0);
  };

  const handlePreviousPageClick = () => {
    navigateToPage(activePage - 2);
  };

  const handleNextPageClick = () => {
    navigateToPage(activePage);
  };

  const handleLastPageClick = () => {
    navigateToPage(pages.length - 1);
  };

  const navigateToPage = function (index) {
    if (index < 0 || index >= pages.length) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(index + 1);
    setApiURL(pages[index]);
  };

  if (pages.length <= 1) return null;

  const firstPageAction = handleFirstPageClick;
  const previousPageAction = handlePreviousPageClick;
  const nextPageAction = handleNextPageClick;
  const lastPageAction = handleLastPageClick;

  return (
    <StyledPagination>
      {activePage > 1 && (
        <>
          <Page onClick={firstPageAction}>« First</Page>
          {activePage > 2 && <Ellipsis>...</Ellipsis>}
          <Page onClick={previousPageAction}>{activePage - 1}</Page>{' '}
        </>
      )}
      <Page active>{activePage}</Page>{' '}
      {activePage < pages.length && (
        <>
          <Page onClick={nextPageAction}>{activePage + 1}</Page>{' '}
          {activePage + 1 < pages.length && <Ellipsis>...</Ellipsis>}
          <Page onClick={lastPageAction}>Last »</Page>
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
