import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Product } from '../../interfaces/Product';
import productSchema from '../../schemas/productSchema';
import { useEffect, useState } from 'react';
import { instance } from '../../apis';
import styles from './ProductForm.module.scss';
import { ICategory } from '../../interfaces/Category';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  onSubmit: (product: Product) => void;
}

const ProductForm = ({ onSubmit }: Props) => {
  const { id } = useParams<{ id?: string }>();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Product>({
    resolver: zodResolver(productSchema)
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data.data);
      })();
    }
  }, [id, reset]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get('/categories');
        setCategories(data.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    })();
  }, []);

  const handleFormSubmit = (data: Product) => {
    onSubmit({ ...data, _id: id, categoryId: data.categoryId });
  }
  
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h1>{id ? "Edit Product" : "Add Product"}</h1>
        <div className={`mb-3 form-group ${styles.formGroup}`}>
          <label htmlFor="title" className={`form-label ${styles.formLabel}`}>Title</label>
          <input type="text" className={`form-control ${styles.formControl}`} id="title"
            placeholder='Title'
            {...register("title")}
          />
          {errors.title?.message && <p className={styles.textDanger}>{errors.title?.message}</p>}
        </div>
        <div className={`mb-3 form-group ${styles.formGroup}`}>
          <label htmlFor="price" className={`form-label ${styles.formLabel}`}>Price</label>
          <input type="number" className={`form-control ${styles.formControl}`} id="price"
            placeholder='Price'
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price?.message && <p className={styles.textDanger}>{errors.price?.message}</p>}
        </div>
        <div className={`mb-3 form-group ${styles.formGroup}`}>
          <label htmlFor="description" className={`form-label ${styles.formLabel}`}>Description</label>
          <textarea rows={4} className={`form-control ${styles.formControl}`} id="description"
            placeholder='Description'
            {...register("description")}
          />
          {errors.description?.message && <p className={styles.textDanger}>{errors.description?.message}</p>}
        </div>
        <div className={`mb-3 form-group ${styles.formGroup}`}>
          <label htmlFor="image" className={`form-label ${styles.formLabel}`}>Image</label>
          <input type="text" className={`form-control ${styles.formControl}`} id="image"
            placeholder='Image'
            {...register("image")}
          />
          {errors.image?.message && <p className={styles.textDanger}>{errors.image?.message}</p>}
        </div>
        <div className={`mb-3 form-group ${styles.formGroup}`}>
          <label htmlFor="categoryId" className={`form-label ${styles.formLabel}`}>Category</label>
          <select className={`form-control ${styles.formControl}`} id="categoryId" {...register("categoryId")}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId?.message && <p className={styles.textDanger}>{errors.categoryId?.message}</p>}
        </div>
        <div className={`mb-3 form-group ${styles.formGroup}`}>
          <button className={`btn btn-primary ${styles.btnPrimary}`} type='submit'>
            {id ? "Edit Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm;
