"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const NewPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const title = watch("title", "");
  const description = watch("description", "");

  const onSubmit = async () => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    router.refresh();
    router.push("/");
    window.location.href = "/";
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="bg-slate-900 p-10 lg:w-1/4 md:w-1/2 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="title" className="font-bold text-sm">
          Título de la tarea
        </label>
        <input
          id="title"
          type="text"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Título"
          {...register("title", {
            required: "El título es requerido",
            maxLength: 20,
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "El título solo puede contener letras y espacios",
            },
          })}
        />
        {errors.title && (
          <p className="text-red-400 font-bold">{errors.title.message}</p>
        )}
        <label htmlFor="description" className="font-bold text-sm">
          Descripción de la tarea
        </label>
        <textarea
          id="description"
          rows="3"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Describe tu tarea"
          {...register("description", {
            maxLength: 50,
            pattern: {
              value: /^[A-Za-z\s]*$/,
              message: "La descripción solo puede contener letras y espacios",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="text-red-400 font-bold">{errors.description.message}</p>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        >
          Add
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
export default NewPage;
