import Link from "../../node_modules/next/link";

export default function Home() {
  return (

    <>
    
      <div className="h-full w-full flex flex-col justify-center items-center gap-y-3" >

          This is the main page

          <Link href="/login">
            <button className="h-8 w-32 bg-white rounded-lg text-black font-bold" >Login</button>
          </Link>

          <Link href="/signup">
          <button className="h-8 w-32 bg-white rounded-lg text-black font-bold" >Signup</button>
          </Link>
          
          
      </div>
    
    </>
    
  );
}
