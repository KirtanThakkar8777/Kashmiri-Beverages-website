import { useEffect, useState } from "react";
import { Navbar } from '../Navbar'
import Footer from '../Footer'
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Messages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch("/api/Message",{
          method: "GET",
          credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setMessages(data.data);
      } catch (err) {
        setError("Could ot load messages")
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  const logout = async () =>{
     try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const deleteMsg = async (id) => {
    try {
      let conf = confirm("Do you really want to delete this message?")
      if (conf) {
        const res = await fetch(`/api/Message/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          setMessages((prev) => prev.filter((msg) => msg._id !== id));
        }
        else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) return <p className='text-white'>Loading messages...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#16a34a",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#dc2626",
              color: "#fff",
            },
          },
        }}
      />
      <Navbar />
      <section className='relative py-24 min-h-screen bg-linear-to-bl from-gray-900 to-black'>
     <button
    onClick={logout}
    className='absolute z-10 cursor-pointer top-6 right-8 bg-white/30 border border-white/30 p-2 rounded hover:scale-105 transition'
  >
    <img width={30} src="/logout.png" alt="Logout" className='' />
  </button>
        <div className='max-w-7xl mx-auto px-5 lg:px-12'>
          <h1 className='text-white text-center py-10 font-bold text-4xl'>Contect Messages</h1>
          <div className='h-[75vh] overflow-y-auto hide-scrollbar'>
            {messages.length === 0 ? (<p className='text-white'>No messages found</p>) : (
              <div className='relative space-y-4'>
                {messages.map((msg) => (
                  <div key={msg._id} className='bg-white/30 backdrop-blur-[10px] border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.08)] rounded-lg p-4'>
                    <div className='flex justify-between'>
                      <h2 className='font-semibold text-white text-2xl'>Name: {msg.name}</h2>
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-white/30">Email: {msg.email}</p>
                    <p className="mt-2 font-semibold">Mesage: {msg.message}</p>
                    <button onClick={() => deleteMsg(msg._id)}
                      className="flex items-center absolute right-6 bottom-4 cursor-pointer">
                      <img src="/hero_images/delete.png" width={20} alt="Delete" />
                      <span className="ml-1">Delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Messages