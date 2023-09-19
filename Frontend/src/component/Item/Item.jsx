import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const ItemTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      fromDate: '23-01-01',
      toDate: '23-02-15',
      assessment: 'First term examination',
      type: 'Examination',
      class: 'SS 1',

    },
    {
      id: 2,
      fromDate: '23-03-10',
      toDate: '23-04-30',
      assessment: 'First term examination',
      type: 'Examination',
      class: 'SS 2',

    },
    {
      id: 3,
      fromDate: '23-02-20',
      toDate: '23-03-25',
      assessment: 'First term examination',
      type: 'Test',
      class: 'JSS 1',

    },
    {
      id: 4,
      fromDate: '23-05-01',
      toDate: '23-05-31',
      assessment: 'First term examination',
      type: 'Test',
      class: 'JSS 1',

    },
    {
      id: 5,
      fromDate: '23-04-15',
      toDate: '23-06-30',
      assessment: 'First term examination',
      type: 'Test',
      class: 'JSS 1',

    },
  ]);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleEdit = (id) => {
    // Implement logic here 
    console.log(`Edit product with ID ${id}`);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>From Date</th>
          <th>To Date</th>
          <th>Assessment</th>
          <th>Type</th>
          <th>Class</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.fromDate}</td>
            <td>{product.toDate}</td>
            <td>{product.assessment}</td>
            <td>{product.type}</td>
            <td>{product.class}</td>

            <td>
              <div className="d-inline">
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
                {' '}
                <Button
                  variant="warning"
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ItemTable;
