import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface BookFormData {
  title: string;
  body: string;
}

const BookEdit = () => {
  const bookId = useRouter().query.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BookFormData>();
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    if (!bookId) return;

    axios
      .get<Book>(`http://localhost:8080/books/${bookId}`)
      .then(({ data }) => {
        setBook(data);
        // データをセットする際に、react-hook-form の setValue メソッドを使用して、デフォルト値をセットします
        setValue("title", data.title);
        setValue("body", data.body);
      });
  }, [bookId]);

  const onSubmit: SubmitHandler<BookFormData> = async (data) => {
    await axios
      .patch(`http://localhost:8080/books/${bookId}`, data)
      .then(() => {
        Router.push(`/books/${bookId}`);
      });
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
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>body</label>
          <br />
          <textarea
            {...register("body", { required: "bodyが入力されていません" })}
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
