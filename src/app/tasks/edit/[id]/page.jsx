"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";

const EditPage = ({ params }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`/api/tasks/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setValue("title", data.title);
        setValue("description", data.description);
      });
  }, []);

    const onSubmit = async (formData) => {
      const { title, description } = formData;
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
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
        className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2 rounded-lg"
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
            maxLength: 30,
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
        <div className="flex justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
            type="submit"
          >
            Edit
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => {
              Swal.fire({
                title: "¿Estás seguro?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Sí, bórralo!",
                cancelButtonText: "No, cancelar!",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const res = await fetch(`/api/tasks/${params.id}`, {
                    method: "DELETE",
                  });
                  const data = await res.json();
                  console.log(data);
                  router.refresh();
                  router.push("/");
                  window.location.href = "/";

                  Swal.fire(
                    "¡Eliminado!",
                    "Tu archivo ha sido eliminado.",
                    "success"
                  );
                }
              });
            }}
          >
            Delete
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
