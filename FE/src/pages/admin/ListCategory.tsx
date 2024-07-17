import { Link } from 'react-router-dom';
import { ICategory } from '../../interfaces/Category';

type Props = {
    categories: ICategory[];
};

const ListCategory = ({ categories }: Props) => {
   
    return (
        <div className="container mt-4">
            <table className="table table-bordered table-striped text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td className="text-truncate" style={{ maxWidth: '200px' }}>
                                {category.slug}
                            </td>
                            <td>
                                <Link to={`/admin/product/edit/${category._id}`} className='btn btn-warning'>
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCategory;
