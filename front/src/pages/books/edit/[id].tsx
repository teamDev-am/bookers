import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BookEdit = () => {
  const bookId = useRouter().query.id;
  const [book, setBook] = useState<Book>({ id: "", title: "", body: "" });

  useEffect(() => {
    if (!bookId) return;
    axios.get(`http://localhost:8080/books/${bookId}`).then((res) => {
      setBook(res.data);
    });
  }, [bookId]);
  
  const { register, handleSubmit } = useForm<Book>();

  const onSubmit: SubmitHandler<Book> = async () => {
    await axios.patch(`http://localhost:8080/books`).then(() => {});
  };

  return (
    <>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>title</label>
          <input {...register("title")} defaultValue={book.title} />
        </div>
        <div>
          <label>body</label>
          <input {...register("body")} defaultValue={book.body} />
        </div>
      </form>
    </>
  );
};
export default BookEdit;
