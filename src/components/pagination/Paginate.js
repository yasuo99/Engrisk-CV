import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Paginate = ({currentPage,pageSize, totalPages, change}) => {
  const [size,setSize] = useState(0);
  const [page,setPage] = useState(0);
  useEffect(() => {
    setSize(pageSize)
  },[pageSize])
  useEffect(() => {
    setPage(currentPage)
  },[currentPage])
  async function pageChange(e) {
    setPage(e.selected+1)
    await change(e.selected + 1, parseInt(size));
  }
  return (
    <div className="d-flex justify-content-between">
      <select
        className="pagination-select"
        name="display"
        onChange={(e) => {
          change(page,parseInt(e.target.value))
        }}
        value={size}
      >
        <option className='item' value={5}>5</option>
        <option className='item' value={10}>10</option>
        <option className='item' value={15}>15</option>
      </select>
      <ReactPaginate
        previousLabel={"Quay lại"}
        nextLabel={"Tiếp theo"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        breakLabel={"..."}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        forcePage={currentPage-1}
        onPageChange={(e) => pageChange(e)}
        containerClassName={"justify-content-center pagination pagination-md"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};
export default Paginate;
