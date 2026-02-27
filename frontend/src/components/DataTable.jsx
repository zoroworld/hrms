import Loader from "./Loader";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

const DataTable = ({
    columns,
    data,
    renderRow,
    loading = false,
    error = "",
    hasFetched = true,
    page,
    totalPages,
    onPageChange,
    onRetry,
}) => {
    if (loading) return <Loader />;

    if (error) {
        return <ErrorState message={error} onRetry={onRetry} />;
    }

    if (hasFetched && data.length === 0) {
        return <EmptyState message="No records found" />;
    }

    if (data.length === 0) return null;

    return (
        <>
            <table className="table table-bordered table-hover bg-white">
                <thead className="table-dark">
                    <tr>
                        {columns.map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>{data.map(renderRow)}</tbody>
            </table>

            {page && totalPages > 1 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </>
    );
};

export default DataTable;