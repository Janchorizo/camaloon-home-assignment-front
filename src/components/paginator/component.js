import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
// internal
import style from './style.module.css';


/**
 * Paginator component
 * @component
 * @return {React.Component}
 */
export default function Paginator({
  pageCount=0,
  onChange=null,
}) {
  const [page, setPage] = useState(0)
  useEffect(() => {
    setPage(Math.max(0, Math.min(page, pageCount-1)));
  }, [pageCount]);

  function nextPage() {
    const newPage = Math.min(page+1, pageCount-1);
    setPage(newPage);
    onChange?.(newPage);
  }

  function prevPage() {
    const newPage = Math.max(page-1, 0);
    setPage(newPage);
    onChange?.(newPage);
  }

  return <div className={style.paginator}>
    <div>
      <a href='#' onClick={prevPage}>🡸 Previous</a>
      <span>Page {page + 1} of {pageCount}</span>
      <a href='#' onClick={nextPage}>Next 🡺</a>
    </div>
    <hr/>
  </div>;
}

Paginator.propTypes = {
  selected: PropTypes.number,
  labels: PropTypes.arrayOf(
      PropTypes.string,
  ),
  onChange: PropTypes.func,
};
