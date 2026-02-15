import { Mail, MapPin, Phone, } from "lucide-react";
import { useForm } from 'react-hook-form';
import toast, { Toaster } from "react-hot-toast";

function Contact_Us() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    const minDelay = (promise, ms) =>
        Promise.all([promise, new Promise((r) => setTimeout(r, ms))])
            .then(([result]) => result);

    const onSubmit = async (data) => {
        const toastId = toast.loading("Sending message...");
        try {
            const res = await minDelay(
                fetch("http://localhost:5000/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }),
                1500
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }
            toast.success("Message sent successfully", {
                id: toastId,
            });
            reset();
        } catch (err) {
            toast.error("something went wrong", {
                id: toastId,
            });
        }
    };
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
            <section id="contact" className="py-24 bg-linear-to-tl from-gray-900 to-black relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="bg-white/10 rounded-3xl border border-white/20 p-8 lg:p-16">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Left side */}
                            <div className="">
                                <span className="text-orange-400 text-sm uppercase font-bold tracking-widest">Get in touch</span>
                                <h2 className="text-4xl font-bold text-white mt-4 mb-6">Let's Connect</h2>
                                <p className="text-white/70 text-lg mb-8 leading-relaxed">Have questions about our products or want to partner with us? We'd love to hear from you.</p>
                                {/* Social */}
                                <div className="space-y-6">
                                    {[
                                        { icon: Mail, label: 'Email', value: 'kashmiribeverages@gmail.com' },
                                        { icon: Phone, label: 'Phone', value: '+91 94291 61582' },
                                        { icon: MapPin, label: 'Address', value: 'Kathlal, Gujarat' }
                                    ].map((contact, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                                                <contact.icon className="w-5 h-5 text-orange-400" />
                                            </div>
                                            <div>
                                                <div className="text-white/50 text-sm">{contact.label}</div>
                                                <div className="text-white text-sm">{contact.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Right side */}
                            <div className="bg-white/5 rounded-2xl p-8">
                                <form className="space-y-4" action="" onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label className="text-white/70 text-sm mb-2 block">Name</label>
                                        <input {...register("name")} type="text" className="w-full bg-white/10 rounded-xl text-white border placeholder-white/40 border-white/20 px-4 py-3 focus:border-orange-500 transition-all duration-300 focus:outline-none" placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label className="text-white/70 text-sm mb-2 block">Email</label>
                                        <input type="text" {...register("email")} className="w-full bg-white/10 rounded-xl text-white border placeholder-white/40 border-white/20 px-4 py-3 focus:border-orange-500 transition-all duration-300 focus:outline-none" placeholder="Your@email.com" />
                                    </div>
                                    <div>
                                        <label className="text-white/70 text-sm mb-2 block">Message</label>
                                        <textarea rows={4} {...register("message")} type="text" className="w-full bg-white/10 rounded-xl text-white border placeholder-white/40 border-white/20 px-5 py-3 focus:border-orange-500 transition-all duration-300 focus:outline-none resize-none" placeholder="Your message..." />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="cursor-pointer w-full bg-white rounded-4xl py-3 font-semibold mt-3 hover:-translate-y-0.5 transition-all duration-300 hover:drop-shadow-2xl">{isSubmitting ? "Sending..." : "Send Message"}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact_Us

