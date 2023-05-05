import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BookEdit = () => {
  const bookId = useRouter().query.id;
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    if (!bookId) return;
    axios.get(`http://localhost:8080/books/${bookId}`).then((res) => {
      setBook(res.data);
    });
  }, [bookId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>();

  const onSubmit: SubmitHandler<Book> = async (data) => {
    await axios
      .patch(`http://localhost:8080/books/${bookId}`, data)
      .then((res) => {});
    Router.push(`/books/${bookId}`);
  };

  return (
    <>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>title</label>
          <br />
          <input
            {...register("title", { required: "titleが入力されていません" })}
            defaultValue={book?.title}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>body</label>
          <input
            {...register("body", { required: "bodyが入力されていません" })}
            defaultValue={book?.body}
          />
          {errors.body && <p>{errors.body.message}</p>}
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
};
export default BookEdit;
