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

  const { register, handleSubmit } = useForm<Book>();

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
          <input {...register("title")} defaultValue={book?.title} />
        </div>
        <div>
          <label>body</label>
          <input {...register("body")} defaultValue={book?.body} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
};
export default BookEdit;
