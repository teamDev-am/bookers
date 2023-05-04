import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BookEdit = () => {
  // const bookId = useRouter().query.id;
  const router = useRouter();
  const bookId = router.query.id;

  const [book, setBook] = useState<Book>({ id: "", title: "", body: "" });

  useEffect(() => {
    // if (!bookId) return;
    //リロードしたらクエリがなくなるからbookIdが使えないので、そのときは関数を走らせない。
    axios.get(`http://localhost:8080/books/${bookId}`).then((res) => {
      console.log(book);
      setBook({ id: "dfvdfv", title: "vgtgtuj7ijfdv", body: "vdfvd" });
      console.log(book);
    });
  }, [bookId]);

  const { register, handleSubmit } = useForm<Book>({
    defaultValues: { title: book.title, body: book.body },
  });

  const onSubmit: SubmitHandler<Book> = async () => {
    await axios.patch(`http://localhost:8080/books`).then(() => {});
  };

  return (
    <>
      <h1>Edit</h1>
      {book.title}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>title</label>
          <input {...register("title")} />
        </div>
        <div>
          <label>body</label>
          <input {...register("body")} />
        </div>
      </form>
    </>
  );
};
export default BookEdit;
