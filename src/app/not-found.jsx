import Link from "next/link";

const NotFound = () => {
     return (
         <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Not Found</h1>
                <Link href="/" className="text-slate-400 text-2xl mt-10">Volver al inicio</Link>
            </div>
             
         </section>
     ); 
}
export default NotFound;